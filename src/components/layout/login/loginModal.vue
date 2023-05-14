<script lang="ts">
    import { defineComponent, computed, ref } from 'vue';
    import { required, minValue, maxLength, numeric, email } from  '@vuelidate/validators'
    import type { MedicalOrder } from '@/types/medical-orders';
    import { useVuelidate } from '@vuelidate/core';
    import type { account, accountLog } from '@/types/common/accounts';
    import { useFirebaseAuth } from '@/composables/useFirebaseAuth';
    export default defineComponent({
        name: 'loginModal',
        props: {
            isOpen: {type: Boolean, required: true}
        },
        emits: ['hide','save'],//, 'save'
        setup(props, { emit }){
            const { loginEmailPswd } = useFirebaseAuth();
            const account = ref<accountLog>({
                email: '',
                password: '',
                //logged: false
            })
            const errMess = ref('')
            const rules = computed(()=>({
                email: {required},
                password: {required},
                //logged: false
            }))
            const v$ = useVuelidate(rules, account)
            const isModalOpen = computed(()=>props.isOpen);
            const handleSubmit = async()=>{

                const isFormValid = await v$.value.$validate()
                if(!isFormValid) {
                    return
                }
                const err = async() => {
                    let data = await loginEmailPswd(account.value.email, account.value.password)
                    if(data === "logged"){
                        //account.value.logged = true
                        //emit('save', account.value.logged)
                        emit('save')
                    }else{
                        errMess.value=data
                        return
                    }
                    account.value.email = ""
                    account.value.password = ""
                    emit('hide')
                }
                err()
            }
            return {
                isModalOpen,
                emit,
                handleSubmit,
                v$,
                errMess,
                account
            }
        }
    })
</script>

<template>
    <div v-show="isModalOpen" class="custom-modal-overlay">
        <div class="custom-modal">
            <div class="columns is-multiline px-5">
                <div class="column is-11">
                    <h1 class="ml-5 is-size-4 has-text-primary">Login</h1>
                </div>
                <div class="column is-1">
                    <div class="close" @click="()=>emit('hide')">
                        <i class="fa fa-times"></i>
                    </div>
                </div>
                <div class="column is-12">
                    <div class="field">
                        <label class="has-text-grey has-text-weight-light">correo</label>
                        <div class="control has-icons-left">
                            <input v-model="v$.email.$model" class="input is-rounded" type="email" placeholder="Email"/>
                            <span class="icon is-small is-left">
                                <i class="fas fa-envelope"></i>
                            </span>
                        </div>
                        <p v-if="errMess === 'no se encontro el correo'" class="has-text-danger">{{ errMess }}</p>
                        <p v-else-if="errMess === 'el correo es invalido'" class="has-text-danger">{{ errMess }}</p>
                        <p v-else-if="v$.email.$error" class="has-text-danger">este campo es obligatorio</p>
                    </div>
                </div>
                <div class="column is-12">
                    <div class="field">
                        <label class="has-text-grey has-text-weight-light">contraseña</label>
                        <div class="control">
                            <input v-model="v$.password.$model" class="input is-rounded" type="password" placeholder = "Password"/>
                        </div>
                        <p v-if="v$.password.$error" class="has-text-danger">este campo es obligatorio</p>
                        <p v-else-if="errMess === 'la contraseña no es correcta'" class="has-text-danger">{{ errMess }}</p>
                    </div>
                </div>
                <div class="column is-12 mt-2">
                    <button class="button is-primary is-fullwidth" @click="handleSubmit">Guardar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .custom-modal-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    background-color: #000000da;
    z-index: 9999;
    }

    .custom-modal {
    background-color: white;
    height: auto; /*350px*/ 
    width: auto;/*500px */
    margin-top: 8%;
    margin-bottom: 12%;
    margin-left: 25%;
    margin-right: 25%;
    padding: 2% 0;
    border-radius: 10px;
    }
    .close {
    cursor: pointer;
    color: rgb(85, 92, 90);
    }
</style>