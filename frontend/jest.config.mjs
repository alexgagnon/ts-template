export default {
    testEnvironment: 'jsdom', // this app runs in the DOM
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'] // add DOM expect methods automatically
}
