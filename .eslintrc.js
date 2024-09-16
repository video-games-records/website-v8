module.exports = {
    env: {
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
    ],
    rules: {
        "vue/max-attributes-per-line": "off",
        "vue/this-in-template": "off",
        "vue/singleline-html-element-content-newline": "off"
    }
}