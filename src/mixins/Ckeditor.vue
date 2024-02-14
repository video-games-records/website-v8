<script>

import NormandieEditor from 'ckeditor5-build-normandie';
import 'ckeditor5-build-normandie/build/translations/fr';

export default {
  data: function () {
    return {
      editor: NormandieEditor,
      editorData: '',
      editorConfig: {
        default: {
          toolbar: {
            items: [
              'heading',
              'bold',
              'italic',
              'strikethrough',
              '|',
              'bulletedList',
              'numberedList',
              'blockQuote',
              '|',
              'link',
              'insertImage',
              'specialCharacters',
              'mediaEmbed',
              '|',
              'removeFormat',
              'undo',
              'redo',
            ]
          },
          image: {
            toolbar: [
              'imageTextAlternative',
              'linkImage'
            ]
          },
        },
        mobile: {
          toolbar: {
            items: [
              'bold',
              'italic',
              'strikethrough',
              '|',
              'bulletedList',
              '|',
              'link',
              'insertImage',
              'specialCharacters',
              'mediaEmbed',
            ]
          },
          image: {
            toolbar: [
              'imageTextAlternative',
              'linkImage'
            ]
          },
        }

      }
    }
  },
  computed: {
    getCkeditorToolBar() {
      if (this.$vuetify.display.mobile) {
        return this.editorConfig.mobile;
      } else {
        return this.editorConfig.default;
      }
    }
  }
}
</script>
