<template>
  <v-sheet class="dropzone d-flex">
    <div v-bind="getRootProps()">
      <input v-bind="getInputProps()" />
      <p v-if="isDragActive">Drop the files here ...</p>
      <p v-else>Drag 'n' drop picture here</p>
    </div>
    <v-btn @click="open" append-icon="mdi-file-upload" class="btn-upload">
      {{ $t('tag.upload') }}
    </v-btn>
  </v-sheet>
</template>

<script>
import { useDropzone } from "vue3-dropzone";
import {usePlayerProofStore} from "@/store/player/proof";

export default {
  name: "PictureDropForm",
  props: ['idPlayerChart'],
  setup(props) {
    const accept = 'image/png,image/jpeg'
    const maxFiles = 1
    const maxSize = 10000000 //ko
    const saveFile = (files) => {
      let _this = this;
      const reader = new FileReader();
      reader.readAsDataURL(files[0])
      reader.onload = function () {
        usePlayerProofStore().setPicture(reader.result, props.idPlayerChart)
      };
    }

    function onDropAccepted(acceptedFiles) {
      saveFile(acceptedFiles)
    }

    function onDropRejected(rejectReasons) {
      alert('ERROR')
    }


    const { getRootProps, getInputProps, ...rest } = useDropzone({ accept, maxSize, maxFiles, onDropAccepted, onDropRejected });

    return {
      getRootProps,
      getInputProps,
      ...rest,
    };
  },
};
</script>

<style scoped>
.dropzone {
  position: relative;
}
.btn-upload {
  position: absolute;
  bottom: 5px;
  right: 5px;
}
</style>
