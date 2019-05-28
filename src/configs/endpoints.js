export default {
    interes : {
        lista               : '/v1/interes/lista',
        jugador             : '/v1/interes/jugador',
        actualizarJugador   : '/v1/interes/jugador/actualizar',
    },
    clan : {
        jugador : '/v1/clan/jugador',
        admin   : '/v1/clan/admin',
        buscar   : '/v1/clan/buscar',
        detalle : '/v1/clan/detalle',
        nuevo   : '/v1/clan/nuevo',
        invitar : '/v1/clan/invitar/amigos', //clan-invitation
        invitaciones : '/v1/clan/invitaciones',
        aceptarInvitacion : '/v1/clan/invitacion/aceptar',
        rechazarInvitacion : '/v1/clan/invitacion/rechazar',
        solicitudesEnviadas : '/v1/clan/solicitudes/enviadas',
        solicitudesRecibidas : '/v1/clan/solicitudes/recibidas',
        cancelarSolicitud    : '/v1/clan/solicitudes/rechazar',
        abandonar    : '/v1/clan/abandonar',
        unirse          : '/v1/clan/unirse',
        aprobarSolicitud : '/v1/clan/invitacion/aprobar',
    },
    usuarios : {
        lista      : '/v1/usuario/lista',
        validar    : '/v1/usuario/validar',
        verificar  : '/v1/usuario/verificar',
        informacion: '/v1/usuario/informacion',
        guardarPseudonimo : '/v1/jugador/informacion/complementaria',
        guardarTokenFCM : '/v1/usuario/guardar/fcm-token',
        invitarAJako : '/v1/usuario/invitar',
    },
    juegoTipo : {
        lista : '/v1/juego/tipo/lista',
    },
    juego : {
        nuevo   : '/v1/juego/nuevo',
        buscar  : '/v1/juego/buscar',
        detalle : '/v1/juego/detalle',
        unir    : '/v1/juego/unir',
        jugador : '/v1/juego/jugador',
        retirar : '/v1/juego/retirar',
        invitar : '/v1/juego/invitar',
        rechazarInvitacion  : '/v1/juego/invitaciones/rechazar',
        cerrar              : '/v1/juego/cerrar',
        compartirConAmigos  : '/v1/juego/compartir/amigos',
        invitaciones        : '/v1/juego/invitaciones',
        pendientesCierre    : '/v1/juego/pendientes/cierre',
        listaTipos          : '/v1/juego/lista/tipos',
    },
    escenarios : {
        lista : '/v1/escenario/lista',        
    },
    jugador : {
        buscar : '/v1/jugador/buscar',
        amigos : '/v1/jugador/amigos',
        detalle : '/v1/jugador/detalle',
        guardarFoto : '/v1/jugador/guardar/foto',
    },
    jugador_solicitud : {
        pendiente   : '/v1/jugador/solicitud/pendiente',
        nuevo       : '/v1/jugador/solicitud/nuevo',
        respuesta   : '/v1/jugador/solicitud/respuesta',
        envaidas    : '/v1/jugador/solicitud/enviadas',
        cancelar    : '/v1/jugador/solicitud/cancelar',
        sugerencias : '/v1/jugador/solicitud/sugerencia',
        
    },
    comentario : {
        nuevo : '/v1/comentario/nuevo',
        lista : '/v1/comentario/lista',
    },
    posicion : {
        lista : '/v1/posicion/lista',
    },
    publicacion : {
        lista : '/v1/publicacion/lista',
        jugador : '/v1/publicacion/jugador',
    }
};