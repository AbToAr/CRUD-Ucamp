var selectRow = null;
var atletas = [];

actRefresh();

function onSubmitForm (){
    if (validacion()){
        var formData = leerTabla();
        if(selectRow == null){
            nuevoAtleta(formData);
        }
        else{
            actualizarAtleta(formData);
        }
        resetTabla();
    }
}

function leerTabla (){
    var formData = {};
    formData ["nombre"] = document.getElementById("nombre").value;
    formData ["disciplina"] = document.getElementById("disciplina").value;
    formData ["fingreso"] = document.getElementById("fingreso").value;
    formData ["fsalida"] = document.getElementById("fsalida").value;
    return formData;
}

function nuevoAtleta (formData) {
    var table = document.getElementById("atletas").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = formData.nombre;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = formData.disciplina;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = formData.fingreso;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = formData.fsalida;
    cell5 = newRow.insertCell (4);
    cell5.innerHTML = '<a onclick=editarAtleta(this)>Editar</a>  <a onclick=borrarAtleta(this)>Borrar</a>';
    atletas.push(formData);
    localStorage.setItem("atletas", JSON.stringify(atletas));
}

function resetTabla () {
    document.getElementById("nombre").value = "";
    document.getElementById("disciplina").value = "";
    document.getElementById("fingreso").value ="";
    document.getElementById("fsalida").value ="";
    selectRow = null;
}

function borrarAtleta (a){
    var row = a.parentElement.parentElement
    if(confirm ("Estás seguro de eliminar al atleta")){
    document.getElementById('atletas').deleteRow(row.rowIndex);
    atletas.splice(row.rowIndex-1,1);
    localStorage.setItem("atletas", JSON.stringify(atletas));
    }
}

function editarAtleta (a){
    selectRow = a.parentElement.parentElement;
    document.getElementById("nombre").value = selectRow.cells[0].innerHTML;
    document.getElementById("disciplina").value = selectRow.cells[1].innerHTML;
    document.getElementById("fingreso").value = selectRow.cells[2].innerHTML;
    document.getElementById("fsalida").value = selectRow.cells[3].innerHTML;
}

function actualizarAtleta (formData){
    selectRow.cells[0].innerHTML = formData.nombre;
    selectRow.cells[1].innerHTML = formData.disciplina;
    selectRow.cells[2].innerHTML = formData.fingreso;
    selectRow.cells[3].innerHTML = formData.fsalida;
    atletas.splice(selectRow.rowIndex-1,1,{nombre:formData.nombre, disciplina:formData.disciplina, fingreso:formData.fingreso, fsalida:formData.fsalida});
    localStorage.setItem("atletas", JSON.stringify(atletas));
}

function validacion () {
    isValid = true;
    if (document.getElementById("nombre").value == ""){
        isValid = false;
        document.getElementById("labelId").classList.remove("hide");
    }
    else {
        isValid = true;
        if (!document.getElementById("labelId").classList.contains("hide")){
            document.getElementById("labelId").classList.add("hide");
        }
    }
    return isValid;
}

function actRefresh (){
    if(localStorage.getItem("atletas")==null){
        console.log("No hay nada en almacenamiento local")
    }
    else{
        atletas = JSON.parse(localStorage.getItem("atletas"));
        for (let index = 0; index < atletas.length; index++){
            let name = atletas [index].nombre;
            let disc = atletas [index].disciplina;
            let fstart = atletas [index].fingreso;
            let fout = atletas [index].fsalida;
            document.getElementById("tbody").innerHTML +=
            `<tr>
                <td>${name}</td>
                <td>${disc}</td>
                <td>${fstart}</td>
                <td>${fout}</td>
                <td><a onclick=editarAtleta(this)>Editar</a>  <a onclick=borrarAtleta(this)>Borrar</a></td>
            </tr>
            `
        }
    }
}