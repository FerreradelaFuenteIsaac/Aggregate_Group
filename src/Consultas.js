db.Empleados.aggregate([
{
    $match: {
        Encargado: false
    }
},
{
     $group: {
        _id: {
              Nom: "$Nombre",
              Horas: "$Horas_Sem",
              Pago: "$Pago_Hora",
              Añad: "$Extra"
        }
    }
},
{
   $match: {
       $expr: {
           gt: [ "$_id.Extra", "$_id.Horas"]
       }
   }
},
{
    $project: {
        _id: 0,
        Nom: "$_id.Nom",
        Horas: "$_id.Horas",
        Sal_Mensual: { $multiply: [ "$_id.Pago", "$_id.Horas", 4]},
        Sal_Anual: { $sum: [ 
            { $multiply: [ "$_id.Pago", "$_id.Horas", 4, 12]},
            "$_id.Añad"
        ]}
    }
},
{
    $match: {
        Sal_Anual: { $gt: 15000}
    }
},
{
    $sort: {
        Horas: -1,
        Sal_Anual: -1
    }
}
])






