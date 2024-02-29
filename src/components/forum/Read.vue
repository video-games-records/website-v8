<template>
    <span v-if="boolRead === false" class="forum-unread" :title="$t('forum.tag.newMessage')">
        <svg width="16" height="16" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true" focusable="false">
            <use xlink:href="#new-message"/>
        </svg>
        <span class="screen-reader-text">{{ $t('forum.tag.newMessage') }}</span>
    </span>
</template>

<script>
export default {
  name: 'Read',
  props: {
    'boolRead': {
      require: true,
    },
  },
};
</script>


