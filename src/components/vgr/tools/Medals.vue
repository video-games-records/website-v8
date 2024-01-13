<template>
    <span>
        <span v-if="( nbPlatinum || nbGold || nbSilver || nbBronze )> 0">
            <span v-if="nbPlatinum> 0" :title="$t('global.platinum')">
                {{ nbPlatinum }}
                <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite platinum" aria-hidden="true"
                     focusable="false">
                    <use xlink:href="#medal"/>
                </svg>
                <span class="d-sr-only">{{ $t('global.platinum') }}</span>
            </span>

            <span v-if="nbGold > 0" :title="$t('global.gold')">
                {{ nbGold }}
                <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite gold" aria-hidden="true"
                     focusable="false">
                    <use xlink:href="#medal"/>
                </svg>
                <span class="d-sr-only">{{ $t('global.gold') }}</span>
            </span>

            <span v-if="nbSilver > 0" :title="$t('global.silver')">
                {{ nbSilver }}
                <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite silver" aria-hidden="true"
                     focusable="false">
                    <use xlink:href="#medal"/>
                </svg>
                <span class="d-sr-only">{{ $t('global.silver') }}</span>
            </span>

            <span v-if="nbBronze > 0" :title="$t('global.bronze')">
                {{ nbBronze }}
                <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite bronze" aria-hidden="true"
                     focusable="false">
                    <use xlink:href="#medal"/>
                </svg>
                <span class="d-sr-only">{{ $t('global.bronze') }}</span>
            </span>
        </span>
        <span v-else>
            {{ $t('global.noMedal') }}
        </span>
    </span>
</template>

<script>
export default {
  name: 'ToolsMedals',
  props: {
    'nbPlatinum': {
      type: Number,
      require: true,
    },
    'nbGold': {
      type: Number,
      require: true,
    },
    'nbSilver': {
      type: Number,
      require: true,
    },
    'nbBronze': {
      type: Number,
      require: true,
    },
  },
  data() {
    return {};
  },
};
</script>
