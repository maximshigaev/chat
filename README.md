# Chat
This repository contains the chat application.

## Usage
First of all, clone or download this repository on the local machine. After that, open the terminal in your code editor and run `npm i`. This command will install all necessary dependencies via NPM. In order to create an optimized production build run `npm run build` command. In order to open this project in the browser firstly run `npm run json:server` command that will launch the server and generate necessary data and secondly run `npm start` command that will create the development build.

## Requirements specification
Within this project should be implemented features listed below:

### Technologies and libraries
- React
- Create-react-app
- Es6+
- Scss
- React-router
- Axios
- Json-server

### App should consist of three layers
- User interface layer

To implement chat (navigation and rooms panel on the left side, chat at the center, user's profile on the right side). To add routing for switching between the channels using react-router.
- Store layer

To add a separate layer of the store for the data storage (at this stage it is possible to keep data in constants). Data for the User interface should be taken from the store and passed through to the components.
- Api layer

To add the Api layer using Axios и Json-server.

### Limitations
- Navigation and rooms panel, chat and user's profile components should be split into the separate components

## Personal goals
- To train the skill of building responsive web application via React and Scss from scratch
- To use the Mobx library as a state-manager and to add reactivity to the project
- To use the Json-server library for the server-side Api and to build the right data-model

## Technical stack
- React v.16.13.1
- Mobx v.5.15.4
- Create-react-app
- Es6+
- Scss
- React-router
- Axios
- Json-server
- Faker
- Formik
- Yup

## The description of the project

### Authorization
First of all, the user, that runs the application will see the spinner, which indicates the loading process. After its completion, if the user has been already authorized to the chat, he will be immediately redirected to the Main-page. Otherwise, he will be immediately redirected to the Login-page. The Login-page has a form that built using the Formik library. It, in turn, consists of two fields:
- Email (required for the successful login, validated using the Yup library - shouldn't be too short and too long, should be a valid email address)
- Password (required for the successful login, validated using the Yup library - shouldn't be too short and too long)

The form also has two buttons:
- Login-button (will be disabled until all fields will be considered valid)
- Signup-button

After the user clicks on the Login-button or press enter when the cursor is within one of the fields, the checking process is triggered. It defines whether the user with given email has been already registered as a member of the chat and if the user wasn't found, the form displays the corresponding error message. In this case, the new user will be prompted to go to the Signup-page for the registration by pressing the Signup-button. If the user was recognized as a member of the chat, he will be redirected to the Main-page. During the login process, he will see the spinner. If there was an error during it, the user will see the backup interface with the information about this.

### Registration
User can reach the Signup-page either via direct input of its URL or via pressing the Signup-button on the Login-page. If the user has been already authorized to the chat, he will be immediately redirected to the Main-page. If the user wants to come back to the Login-page, he can make it by pressing the link to the Login-page at the top-right corner. Signup-page has form that built using the Formik library. It consists of six fields:
- Firstname (required for the successful login, validated using the Yup library - shouldn't be too short and too long)
- Surname (required for the successful login, validated using the Yup library - shouldn't be too short and too long)
- Username (required for the successful login, validated using the Yup library - shouldn't be too short and too long)
- Email (required for the successful login, validated using the Yup library - shouldn't be too short and too long, should be a valid email address)
- Password (required for the successful login, validated using the Yup library - shouldn't be too short and too long)
- Skype (required for the successful login, validated using the Yup library - shouldn't be too short and too long)

The form also has Signup-button. Signup-button will be disabled until all fields will be considered valid. After the user clicks on the button or press enter when the cursor is within one of the fields, the checking process is triggered. It defines whether the user with the given username and email has been already registered as a member of the chat and if so, the form displays the corresponding error message. If the user was recognized as a new user of the chat, he will be redirected to the Main-page. During the signup process, he will see the spinner. If there was an error during it, the user will see the backup interface with the information about this.

### Main functionality

#### Server-side Api
The Server-side Api of the chat was built using the Json-server library. It consists of three main entities: 
- users (were formed using the Faker library and represents random values)
- messages (were formed using the Faker library and represents random values)
- channels (were formed using the Faker library and represents random values)

#### Client-side Api
Client-side Api of the chat was built using the Axios library. It has Axios config and implement some methods for making GET, POST, PUT and DELETE http-requests to the server.

#### Store 
The store of the chat was built using the Mobx state-manager. It implements all logic of the app that needs to be performed during the usage over time. This logic includes:
- observable values
- computed values
- some methods (actions) intended to operate with these values or to implement other logic

#### User interface
User interface of the app consists of the three main parts: 
- menu
- chat
- user's profile

##### Menu
The menu is placed on the left side of the application. It is hidden by default on the mobile and tablet versions of the app. In this case, it can be opened by pressing the hamburger button on the top-left corner of the chat. On these versions, the menu has also the cross button on its top-right corner, which will close the menu if clicked. It consists of:
###### Header

Displays the username of the currently logged-in user and the Setting-button. After pressing the Settings-button, the dropdown with available settings will be displayed. Repeated click on the Settings-button will close the dropdown. The dropdown has three buttons:
 - My-profile-button

  After pressing the My-profile button, the currently logged-in user's profile will be displayed instead of the lists of channels and friends. Within this profile, the user can edit his personal data. The profile consists of the avatar image and 12 inputs:
 - firstname (required for the successful editing of the profile, validated using the Yup library, shouldn't be too short and too long)
 - surname (required for the successful editing of the profile, validated using the Yup library, shouldn't be too short and too long)
 - username (required for the successful editing of the profile, validated using the Yup library, shouldn't be too short and too long)
 - email (read-only)
 - password (required for the successful editing of the profile, validated using the Yup library, shouldn't be too short and too long)
 - skype (required for the successful editing of the profile, validated using the Yup library, shouldn't be too short and too long)
 - profession (validated using the Yup library, shouldn't be too short and too long)
 - timezone (validated using the Yup library, shouldn't be too short and too long, should match the exact format)
 - facebook (validated using the Yup library, shouldn't be too short and too long, should be valid URL)
 - twitter (validated using the Yup library, shouldn't be too short and too long, should be valid URL)
 - instagram (validated using the Yup library, shouldn't be too short and too long, should be valid URL)
 - linkedin (validated using the Yup library, shouldn't be too short and too long, should be valid URL)
 
 Avatar has a default image. By clicking on the avatar, the user can load his own image from the local machine. The profile has a custom scrollbar, that gives the user possibility to scroll and edit all needed fields. On the bottom of the profile, there is a Save-profile-button. It will be disabled until all edited fields will be considered valid. After the user clicks on the Login-button or presses enter when the cursor is within one of the fields, the saving process will be triggered. It will be accompanied by the spinner. After completion, all changes that were made by the user will be displayed within the chat, and the right-side user's profile. If there was an error during the saving process, the user will see the backup interface with the information about this.

 - Theme-button

 Click on the Theme-button will toggle the current theme of the app. There are two available themes:
- dark theme
- light theme

The default theme is dark.
 - Logout-button

Click on the Logout-button will trigger the logout process that will be indicated by the spinner. After its completion user will be immediately redirected to the Login-page. If there was an error during it, the user will see the backup interface with the information about this.

###### List of the channels

Displays three buttons and the number of channels that is available for the user. It provides three modes of sorting the channels by name:
- Default - all channels will be displayed
- Favourite channels (button with star) - will render only channels that are marked as favourite
- Ordinary channels (crossed button with star) - will render only channels that aren't marked as favourite

Pressing one of the Sort-buttons will activate the corresponding sorting mode. Repeated click at the same button will activate the default sorting mode. The number of channels will be changed accordingly. Click by the Plus-button will display the additional input for the name of the new channel. The Plus-button will be replaced with the Minus-button. Click on the Minus-button will remove the additional input and return the Plus-button. The value of this input:
 - required for the successful adding of the channel
 - shouldn't be too short and too long
 
 In case this value is invalid, the corresponding error message will be rendered.On the right side of the input, there is the Tick-button. User can add the new channel either via pressing this button or via pressing enter when the cursor is within the input. If the value is considered valid, the new channel will be added and will be displayed with the old channels after adding completion. This process will be indicated by the spinner. If there was an error during it, the user will see the backup interface with the information about this. Channels list also represents the Search-input. The channels, which names will be suitable for the current value of this input will be immediately displayed within the list of channels. This value is not case-sensitive and trimmed from both sides. A list of channels has a custom scrollbar, that gives the user possibility to scroll and see all available channels. If there was an error during the loading channels process, the user will see the backup interface with the information about this.
  The channel has two buttons:
 - Edit-button

 Click by the Edit-button will display the additional input for the new name of the channel. The Edit-button will be replaced with the Minus-button. Click on the Minus-button will remove the additional input and return the Plus-button. The value of this input:
 - required for the successful renaming of the channel
 - shouldn't be too short and too long

 In case this value is invalid, the corresponding error message will be rendered.
 - Delete-button

 By pressing the delete button the corresponding channel won't be displayed amongst other channels anymore. This process will be accompanied by the spinner. If there was an error during it, the user will see the backup interface with the information about this.
 
 On the right side of the input, there is the Tick-button. User can rename the channel either via pressing this button or via pressing enter when the cursor is within the input. If the value is considered valid, the channel will be renamed. It will be displayed with the new name amongst other channels. This process will be indicated by the spinner. If there was an error during it, user will see the backup interface with the information about this. The click on the channel triggers the loading of the messages belonging to this channel. During this process user will see the spinner. After its completion messages will be displayed within the chat. If there was an error during the loading messages, user will see the backup interface with the information about this. The channel in which messages are currently displayed by the chat has a distinct color.

###### List of the friends

 The list of friends displays the number of user's friends. It also represents Search-input. The friends, whose names will be suitable for the current value of this input will be immediately displayed within the list of friends. This value is not case-sensitive and trimmed from both sides. A list of friends has a custom scrollbar, that gives the user possibility to scroll and see all available friends. If there was an error during the loading friends process, the user will see the backup interface with the information about this. A friend has an indicator, that is green if a friend is online and grey if he isn't.  Click on the friend immediately displays his profile within the right-side profile of the app. The friend whose profile is currently displayed has a distinct color.

##### Chat

Chat is placed on the center of the app. By default, it displays the plug. After user clicks on the channel, chat displays: 
- Header

The header consists of:
- name of the channel
- Favourite-channel-button

By pressing the Favourite-channel-button, user can delete the channel from the favourite list if it was there and vice versa - add the channel to the favourite list if the channel was ordinary.

- number of participants in the current channel
- Search-input.

The messages, which content will include the current value of this input will be immediately rendered within the list of messages. This value is not case-sensitive and trimmed from the both sides.

- List of messages

List of messages has custom scrollbar, that gives the user possibility to scroll and see all available messages. If there was an error during the loading messages process, user will see the backup interface with the information about this.  After the loading of the app, the 5s interval will be set. This interval will imitate the messages from other users and will create a new message in the current channel once in 5 seconds. The messages in the list are split by the date - the new ones are placed on the bottom of the list. The message has the author's avatar, his name, time of the message, and its content. Click on the avatar or the name will open the profile of the corresponding user on the right side.

- Footer

The footer consists of:
- Add-file-button

By pressing the Add-file-button user can add multiple images from his local machine to the message at one time. It will open the images preview with the horizontal scrollbar. These images will be added to the user's message together with the text from the textarea.

- textarea
- Send-message-button

User can add the new message either via pressing the Send-message-button, or via pressing enter when the cursor is within the input. The message creating process will be accompanied by the spinner. After its completion new message will be displayed amongst other messages. If there was an error during it, user will see the backup interface with the information about this.

##### User's profile

The user's profile is placed on the right side of the app. It is hidden by default on the mobile and tablet versions of the app. In this case, it can be opened by pressing the hamburger button on the top-right corner of the chat. On these versions, the user's profile has also the Cross-button on its top-right corner, which will close the profile if clicked.
By default, it displays the currently logged-in user's profile. After user clicks on one of the friends or on any message author's avatar or name, the corresponding user profile will be displayed. The profile consists of:
- user's avatar (required)
- name (required)
- username (required)
- email (required)
- skype (required)
- timezone (optional, if the user pointed out in his profile)
- jobtitle (optional, if the user pointed out in his profile)
- facebook (optional, if the user pointed out in his profile)
- instagram (optional, if the user pointed out in his profile)
- twitter (optional, if the user pointed out in his profile)
- linkedin (optional, if the user pointed out in his profile)

User's profile has an indicator, that is green, when the user is online and is absent when he isn't and two buttons:
- Message-button

Click on this button ideally should display the chat with this user where users can exchange messages, but unfortunately, this functionality hasn't been implemented by now.

- Dropdown-button

Click on this button displays the dropdown, which, in turn, has available buttons:

- Add to/remove from friends button

By pressing the Add to/remove from friends button, the user can be deleted from the list of friends if he was there and vice versa - add the user to the list of friends if he wasn't a friend. This process will be accompanied by the spinner. After the completion, the new friend will be displayed by the list of friends and the deleted user won't be displayed amongst other friends anymore. The number of friends will be changed accordingly. If there was an error during it, the user will see the backup interface with the information about this.

#### Breakpoints
The chat is a responsive web application and is introduced in the three viewport sizes:
- 320px
- 768px
- 1176px
