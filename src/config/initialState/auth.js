const auth = {
  auth: {
    isAuthenticated: false,

    loginIn: false,
    loginData: {},
    loginError: {},

    registering: false,
    registeredApplicant: {},
    registerError: {},

    loggingOut: false,
    logoutData: {},
    logoutError: {},

    gettingAuthUser: false,
    authUser: {},
    authUserError: {},

    requesting: false,
    verifying: false,
    requestEmailSuccess: {},
    requestEmailError: {},
    verifyEmailSuccess: {},
    verifyEmailError: {},

    changingPassword: false,
    changePasswordError: {},
    changePasswordSuccess: {},

    changingDefaultPassword: false,
    changeDefaultPasswordError: {},
    changeDefaultPasswordSuccess: {},

    requestingToken: false,
    requestTokenSuccess: {},
    requestTokenError: {},

    resettingPassword: false,
    resetPasswordSuccess: {},
    resetPasswordError: {},

    updatingUserError: {},
    updateUserSuccess: {},
    updatingUser: false,

    userRoles: [],
    userInstitutions: [],
    currentRole: {},
    currentInst: {},
    currentType: {},
    currentInstType: null,
  },
};

export default auth;
