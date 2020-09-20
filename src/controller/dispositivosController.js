import dispositivo from '../model/Dispositivo'
import { validationResult } from 'express-validator';


const obtenerDispositivos = async (req,res) => {
    const dispositivoDB = await dispositivo.find({});

    return res.json({
        'data': dispositivoDB,
        'mensaje': 'Consulta realizada correctamente',
        'status': 200
    });
}

const obtenerDispositivo = async (req,res) => {
    const dispositivoDB = await dispositivo.findById(req.params.id);

    if (!dispositivoDB) {
        return res.status(404).json({
            'mensaje': 'No se encontro dipositivo.',
            'status': 404
        });
    }
    return res.json({
        'data': dispositivoDB,
        'mensaje': 'Consulta realizada correctamente',
        'status': 200
    });
}

const crearDispositivo = async (req,res) => {
    // Validacion de errores en los parametros enviados
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
        return res.status(400).json({
            'error': errores.array(),
            'mensaje': 'Ocurrio un error en los parametros enviados.',
            'status': 400
        })
    }

    // Creo el objeto BaseTecnica
    const newDispositivo = await dispositivo({
        "HardwareIdentifier": req.body.HardwareIdentifier,
        "Linea": req.body.Linea || null,
        "UserName": req.body.UserName || null
    });

    // Guardamos el objeto en la BD
    newDispositivo.save((err,db) => {
        if (err) {
            //console.log(err)
            return res.status(400).json({
                'error': err.errors,
                'mensaje': 'Error al crear el registro en la base de datos.',
                'status': 400
            })
        }

        return res.json({
            'data': db,
            'mensaje': 'Consulta realizada correctamente',
            'status': 200
        });
    })
}

const modificarDispositivo = async (req,res) => {
    // Validacion de errores en los parametros enviados
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
        return res.status(400).json({
            'error': errores.array(),
            'mensaje': 'Ocurrio un error en los parametros enviados.',
            'status': 400
        })
    }

    const newDispositivo = {
        "HardwareIdentifier": req.body.HardwareIdentifier,
        "Linea": req.body.Linea || null,
        "UserName": req.body.UserName || null
    }

    // Actualizo el objeto BaseTecnica
    await dispositivo.findByIdAndUpdate(req.params.id,newDispositivo,{new: true, upsert: true},(err,db) => {
        if (err) {
            //console.log(err)
            return res.status(400).json({
                'error': err.errors,
                'mensaje': 'Error al modificar el registro en la base de datos.',
                'status': 400
            })
        }

        return res.json({
            'data': db,
            'mensaje': 'Consulta realizada correctamente',
            'status': 200
        });
    });
}

const borrarDispositivo = async (req,res) => {
    // Actualizo el objeto BaseTecnica
    await dispositivo.findByIdAndRemove(req.params.id,(err,db) => {
        if (err) {
            //console.log(err)
            return res.status(400).json({
                'error': err.errors,
                'mensaje': 'Error al borrar el registro en la base de datos.',
                'status': 400
            })
        }

        return res.json({
            'data': db,
            'mensaje': 'Consulta realizada correctamente',
            'status': 200
        });
    });
}

module.exports = {
    obtenerDispositivos, obtenerDispositivo, crearDispositivo, modificarDispositivo, borrarDispositivo
}