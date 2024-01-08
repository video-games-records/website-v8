<script>

import NormandieEditor from 'ckeditor5-build-normandie';
import 'ckeditor5-build-normandie/build/translations/fr';

export default {
  data: function () {
    return {
      editor: NormandieEditor,
      editorData: '',
      editorConfig: {
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
      }
    }
  }
}
</script>
