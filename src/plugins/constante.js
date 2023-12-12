export default {
    install: (app) => {
        app.config.globalProperties.$GAME_STATUS_ACTIVE = 'ACTIVE'
        app.config.globalProperties.$SERIE_STATUS_ACTIVE = 'ACTIVE'
    }
}