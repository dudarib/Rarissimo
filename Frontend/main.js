Moralis.initialize("zhtFOvVlO90ncDMdyBW4MXhPwULckUeLQ11BmmKA");
Moralis.serverURL = 'https://2cvjfiew4kxo.usemoralis.com:2053/server'

init = async () => {
    hideElement(userInfo);
    window.web3 = await Moralis.Web3.enable();
    initUser();
}

/**Takes care of displaying the correct button */
initUser = async () => {
    if(await Moralis.User.current()){
        hideElement(userConnectButton);
        showElement(userProfileButton);
    }else {
        showElement(userConnectButton);
        hideElement(userProfileButton);
    }
}

login = async () => {
    try {
        await Moralis.Web3.authenticate();
        initUser();
    } catch (error) {
        alert(error)
    }
}

logout = async () => {
    await Moralis.User.logOut();
    hideElement(userInfo);
    initUser();
}

openUserInfo = async () => {
    user = await Moralis.User.current();
    if (user){
        const email = user.get('email');
        if(email){
            userEmailField.value = email;
        }else{
            userEmailField.value = "";
        }

        userUsernameField.value = user.get('username');

        const userAvatar = user.get('avatar');
        if(userAvatar){
            userAvatarImg.src = userAvatar.url();
            showElement(userAvatarImg);
        }else{
            hideElement(userAvatarImg);
        }

        showElement(userInfo);
    }else{
        login();
    }
}

saveUserInfo = async () => {
    user.set('email', userEmailField.value);
    user.set('username', userUsernameField.value);

    if (userAvatarFile.files.length > 0) {
        const avatar = new Moralis.File("avatar.jpg", userAvatarFile.files[0]);
        user.set('avatar', avatar);
      }

      await user.save();
      alert("user info saved sucessfull");
      openUserInfo();
}

hideElement = (element) => element.style.display = "none";
showElement = (element) => element.style.display = "block";

const userConnectButton = document.getElementById("btnConnect");
userConnectButton.onclick = login;

const userProfileButton = document.getElementById("btnUserInfo");
userProfileButton.onclick = openUserInfo;

const userInfo = document.getElementById("userInfo");
const userUsernameField = document.getElementById("txtUsername");
const userEmailField = document.getElementById("txtEmail");
const userAvatarImg = document.getElementById("imgAvatar");
const userAvatarFile = document.getElementById("fileAvatar");


document.getElementById("btnCloseUserInfo").onclick = () => hideElement(userInfo);
document.getElementById("btnLogout").onclick = logout;
document.getElementById("btnSaveUserInfo").onclick = saveUserInfo;


init();