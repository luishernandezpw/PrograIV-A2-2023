<template>
    <div class="row">
        <div class="col-12 col-md-6">
            <div class="card border-primary">
                <div class="card-header bg-primary text-white">CHAT USUARIOS</div>
                <div class="card-body">
                    <div class="row">
                        <div class="col">
                            <ul id="ltsMensajes">
                                <li v-for="msg in chats" :key="msg._id">
                                    {{ msg.from }} - {{ msg.message }}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <form id="frmChat" @submit.prevent="guardarChat" @reset.prevent="nuevoChat()">
                                 <input type="text" placeholder="Escribe tu mensaje" required v-model="chat.message" class="form-control" />              
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>    
</template>
<script>
import axios from 'axios';
import alertify from 'alertifyjs';

    export default {
        data() {
            return {
                chats: [],
                chat:{
                    from: 'usuario',
                    to: 'todos',
                    message:'',
                    status:'',
                    fecha: new Date()
                }
            }
        },
        methods:{
            guardarChat(){
                if( this.chat.message!='' ){
                    this.chats.push( {...this.chat} );
                    socketio.emit('chat', this.chat);
                }else{
                    alertify.error('Por escriba un mensaje');
                }
            },
            obtenerHistorial(){
                socketio.emit('historial');
                socketio.on('historial', chats=>{
                    this.chats = chats;
                });
            }
        },
        created(){
            this.obtenerHistorial();
            socketio.on('chat', chat=>{
                this.chats.push( chat );
            });
        }
    }
</script>