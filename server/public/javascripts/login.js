
window.addEventListener('load',function () {
    var form = {
        data:{
            nickname:'',
            password:''
        },
        verifyNickname:function () {
            var isV = true;
            if(this.data.nickname === ''){
                this.nickname.className += ' login-error-input';
                isV = false;
            } else{
                this.nickname.className = 'login-form-control';
            }
            return isV;
        },
        verifyPassword:function () {
            var isV = true;
            if(this.data.password === ''){
                this.password.className += ' login-error-input';
                isV = false;
            } else{
                this.password.className = 'login-form-control';
            }
            return isV
        }
    };
    form.loginOwl = document.getElementById('login-owl');
    form.password = document.getElementById('password');
    form.nickname = document.getElementById('nickname');
    form.password.addEventListener('focus',function(){
        form.loginOwl.className = 'password';
    })
    form.password.addEventListener('blur',function(){
        form.loginOwl.className = '';
    })
    document.addEventListener('change',function (e) {
        switch(e.target.id){
            case 'nickname':{
                form.data.nickname = e.target.value.trim();
                form.verifyNickname();
                break;
            }
            case 'password':{
                form.data.password = e.target.value.trim();
                form.verifyPassword();
                break;
            }
        }
    })
    document.addEventListener('click',function (e) {
        if(e.target.id === 'signUp' || e.target.id === 'login'){
            var url = e.target.id === 'login' ? '/login' : '/signUp';
            var text = e.target.id === 'login' ? 'login...' : 'sign up...';
            form.data.nickname = form.nickname.value.trim();
            form.data.password = form.password.value.trim();
            if( form.verifyNickname() && form.verifyPassword() ){
                e.target.innerHTML = text;
                e.target.disabled = true;
                reqwest({
                    url:url,
                    method: 'post',
                    data: form.data,
                    success: function (res) {
                        if(res.isNicknameErr){
                            form.nickname.className += ' login-error-input';
                            form.nickname.focus();
                            e.target.disabled = false;
                            e.target.innerHTML = e.target.id === 'login' ? 'login' : 'sign up';
                        } else if(res.isPasswordErr){
                            form.password.className += ' login-error-input';
                            form.password.focus();
                            e.target.disabled = false;
                            e.target.innerHTML = e.target.id === 'login' ? 'login' : 'sign up';
                        } else{
                            if(!localStorage){
                                alert('基于localStorage做登录状态识别,您的浏览器可能并不支持localStorage');                                
                            } 
                            localStorage.setItem('token',res.jwt);
                            window.location = '/';
                        }
                    },
                    error: function (err) {
                        alert('server error!!!');
                        console.error(err);
                    }
                })
            }
        }
    })
})
