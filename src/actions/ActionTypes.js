//resizeable ext input type
export const HEIGHT_CHANGED = 'textChanged';

//Group Identification Actions
export const GROUP_PIN_SUCCESS = 'groupPinExist';
export const GROUP_PIN_FAIL = 'groupPinFail';
export const GROUP_PIN_PENDING = 'groupPinPending';
export const GROUP_PIN_CHANGED = 'groupPinChanged';
export const GROUP_PIN_DONE = "GroupPinDone";

//select role
export const ROLE_SELECTED = 'roleSelected';
export const RESET_SELECTION = 'resetSelection';

//Sign In Actions
export const EMAIL_FIELD_CHANGED = 'emailFieldChanged';
export const PASS_FIELD_CHANGED = 'passwordFieldChanged';
export const SIGN_IN_PENDING = "SIGN_IN_PENDING";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_IN_FAIL = "SIGN_IN_FAIL";
export const SIGN_IN_DONE = 'signInDone';
export const RESET_FORM ='resetRemainingStateToInitial';
export const USER_CHANGED = 'changeUserData'
export const USER_CHANGE_FAILED = 'userChangeFailed'
export const USER_CHANGE_PENDING = 'userDataChangeIsPending';
export const RESET_ERROR = 'resetError';

// User Sign up actions
export const SIGN_UP_PENDING = "SIGN_UP_PENDING";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAIL = "SIGN_UP_FAIL";
export const VALID_FAIL = "validationFailed";
export const VALID_RESET = 'validReset';
export const GET_PHOTOS = "accessPhotosAndCamera";
export const GET_PHOTOS_FAIL = 'accessPhotoAndCameraFailed';
export const SIGNUP_ERROR_RESET = 'resetSignUpError';

// parent/guardian signup actions
export const SIGN_UP_PENDING_P = 'signUpPendingParent';
export const SIGN_UP_SUCCESS_P = 'signUpSuccessParent';
export const SIGN_UP_FAIL_P = 'signUpFailParent';
export const GET_PHOTOS_P = 'accessPhotoAndCameraForParent';
export const GET_PHOTOS_FAIL_P = 'accessPhotoAndCameraForParentFailed';
export const VALID_FAIL_P = "validationFailed";
export const VALID_RESET_P = 'validReset';

//Itinerary actions
export const ITINERARY_PENDING = 'itineraryPending';
export const ITINERARY_FOUND = 'itineraryFound';
export const ITINERARY_NOT_FOUND = 'itineraryNotFound';

//Notification Actions
export const MESSAGE_SENT = 'messageSent'
export const MESSAGES_RECEIVED = 'messagesReceived';
export const MESSAGE_RECEIVED = 'messageReceived';
export const MESSAGE_PENDING = 'messagePending';
export const NOTIF_ERROR = 'messageError';
export const RESET_NOTIF_ERROR = 'resetNotificationError'
export const RESET_MESSAGE_SENT = 'resetMessageSent';
export const UPDATE_MESSAGE = 'updateMessage';
export const RESET_UPDATE_VAR = 'resetUpdateVar';
export const ALARM_RECEIVED = 'alarm received';
export const ALARMS_NOT_RECEIVED = 'alarmNotReceived';
export const ALARMS_RECEIVED = 'alarmsReceived'
export const REMOVE_ALARM = 'removeAlarm';


//Lost user action types
export const LOST_MESSAGE_PENDING = 'lostMessagePending'
export const LOST_MESSAGE_SENT = 'lostMessageSent';
export const LOST_ERROR = 'lostMessageError';
export const RESET_LOST_MESSAGE = 'resetLostMessageSent';
export const LOST_USERS_RECEIVED = 'lostUsersReceived';
export const LOST_USER_RECEIVED = 'lostUserReceived';
export const CHANGE_MAP_VISIBLE = 'changeMapVisible';
export const CHANGE_LOST_POSITION =  'changeLostPosition'

//contacts and about types
export const CONTACTS_RECEIVED = 'contacts_received';
export const CONTACTS_ERROR= 'contactsError';
export const ABOUT_RECEIVED = 'aboutReceived';
export const ABOUT_ERROR = 'aboutError';

// user modification acctions
export const EDIT_USER = 'editUser'