# Clever-To-Do-List

### This app is some kind of task manager, which allows you to schedule tasks according to days. This project is based on Vue3 (Options API mostly) and Firebase DB.

---

### This project was inspired by recommendations from this [technical assignment](https://drive.google.com/file/d/1HSv-FOKimLhaTIeWOBAeXMR8J90uPAGj/view?usp=sharing).

---

### This project is hosted using Firebase, you can try it now here:

## https://clever-to-do-list-by-shist.web.app/

---

## Video demo:

https://github.com/Shist/clever-to-do-list/assets/40572268/bbfbf60f-8e19-4696-8f74-fa389df548dd

---

## Instruction for launching this project

1. Go to the folder on your PC where you want to install the project:
   `cd "your-folder"`
1. Download and install files of this project:
   `git clone https://github.com/Shist/clever-to-do-list`
1. Go to the app folder:
   `cd clever-to-do-list`
1. Install all needed dependencies:
   `npm install`
1. Next, you need to set the necessary variables in the .env file of the project (a template for this file is in the repository). You will need to insert your config settings for Firebase, as well as the name of your collection in the database and the name of the field for list of notes. You can find more detailed instructions in the [Firebase documentation](https://firebase.google.com/docs/web/setup?hl=en&authuser=2).
1. Once you've finished setting up the environment variable (see above), you can run the project:
   `npm run serve`

Here is exemplary view of your .env file:
* `# Firebase settings`
* `VUE_APP_API_KEY= your api key`
* `VUE_APP_AUTH_DOMAIN= your auth domain`
* `VUE_APP_PROJECT_ID= your project id`
* `VUE_APP_STORAGE_BUCKET= your storage bucket`
* `VUE_APP_MESSAGING_SENDER_ID= your messaging sender id`
* `VUE_APP_APP_ID= your app id`
* `VUE_APP_MEASUREMENT_ID= your measurement id`

---

## Here is Firestore Database snapshot of user note list data:

![db-snapshot](https://github.com/Shist/clever-to-do-list/assets/40572268/629e4957-e83f-4b33-993d-da3de5d202aa)

---

## Description of folder structure

- The `public` folder stores main html document and its favicon
- The `src` folder stores all the files connected with development
  - The `assets` folder stores all fonts and icons
    - The `fonts` folder stores all local fonts
    - The `icons` folder stores all icons (except favicon)
  - The `components` folder stores some Vue components that can presumably be reused somewhere many times
    - The `UI` folder stores some custom app elements which are expected to be used as default for the application
  - The `mixins` folder stores all Vue mixins of the app, they can be reused in different places of the app
  - The `pages` folder stores all Vue components which represent the main application pages
  - The `router` folder stores the files with settings of routing of the app
  - The `services` folder stores files containing the logic of various services
    - The `firebase` folder stores all logic connected with Firebase service
  - The `store` folder stores Vuex files, mostly - the modules of the Vuex store
  - The `styles` folder stores all the application styles

---

## Technologies used in the project

- HTML
- CSS / SCSS
- Javascript
- Vue3 (mostly Options API)
- Firestore DB
- Vuex
- Vue Router
- vue3-toastify
- date-fns
- ESlint (with pre-commit hooks)
- Webpack / Babel (default from Vue)
- Prettier
- Fetch API (async/await)
- Modules (import/export)
- HTTP-Requests

