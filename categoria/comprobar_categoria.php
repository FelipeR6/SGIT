<div class="col-8 p-4">
            <table class="table table-striped">
                <thead class="bg-info">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre_Categoria</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    include "categoria/conexion.php";
                    $sql = $conexion->query(" SELECT * FROM categoria ");
                    while ($datos = $sql->fetch_object()) { ?>

                        <tr>
                            <td><?= $datos->Id_Categoria ?></td>
                            <td><?= $datos->Nombre_Categoria ?></td>
                            
                            <td>
                                <a href="modificar_categoria.php?id=<?= $datos->Id_Categoria  ?>" class="btn btn-small btn-warning"><i class="fa-solid fa-user-pen"></i></a>
                                <a onclick="return eliminar()" href="categoria.php?id=<?= $datos->Id_Categoria ?>" class="btn btn-small btn-danger"><i class="fa-solid fa-trash"></i></a>
                            </td>
                        </tr>
                    <?php }
                    ?>

                </tbody>
            </table>
        </div>
    </div>