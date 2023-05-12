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
        emits: ['hide'],
        setup(props, { emit }){
            const { loginEmailPswd } = useFirebaseAuth();
            const account = ref<accountLog>({
                email: '',
                password: '',
                logged: false
            })
            const rules = computed(()=>({
                email: {required},
                password: {required},
                logged: false
            }))
            const v$ = useVuelidate(rules, account)
            const isModalOpen = computed(()=>props.isOpen);
            const handleSubmit = async()=>{
                const isFormValid = await v$.value.$validate()
                if(!isFormValid) {
                    return
                }
                //registEmailPswd(account.value.email, account.value.password)
                /* account.value.email=""
                account.value.password=""
                account.value.logged=true */
                loginEmailPswd(account.value.email, account.value.password)
                emit('hide')
            }
            return {
                isModalOpen,
                emit,
                handleSubmit,
                v$
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
                    </div>
                </div>
                <div class="column is-12">
                    <div class="field">
                        <label class="has-text-grey has-text-weight-light">contraseña</label>
                        <div class="control">
                            <input v-model="v$.password.$model" class="input is-rounded" type="password" placeholder = "Password"/>
                        </div>
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
    height: 350px;
    width: 500px;
    margin-top: 7%;
    padding: 40px 0;
    border-radius: 10px;
    }
    .close {
    cursor: pointer;
    color: rgb(85, 92, 90);
    }
</style>