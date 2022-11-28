<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include "DBConnect.php";
$obj = new DbConnect();
$conn = $obj->connect();


$method = $_SERVER['REQUEST_METHOD'];
switch ($method){
    case "GET":
        $sql = "SELECT * FROM users ";
        $path =  explode('/', $_SERVER['REQUEST_URI']);
        $WholePath = $_SERVER['REQUEST_URI'];
        if(isset($path[2]) && is_numeric($path[2])){
            $sql = "SELECT * FROM cars ";
            $sql .= "WHERE id like :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindValue(":id", $path[2]);
            $stmt->execute();
            $users = $stmt->fetch(PDO::FETCH_ASSOC);
        }
        elseif ($WholePath == "/cars"){
            $sql2 = "SELECT * FROM cars ";
            $stmt = $conn->prepare($sql2);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        else{
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        echo json_encode($users);
        break;
    case "POST":
        $user = json_decode(file_get_contents('php://input'));
        $path =  $_SERVER['REQUEST_URI'];
        if($path == "/users/check"){
            $sql = "SELECT * FROM users WHERE `email` =:email";
            $stmt =$conn->prepare($sql);
            $stmt->bindValue(":email", $user->email);
            $stmt->execute();
            $users = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode($users);
        }
        elseif($path == "/car/userRating"){
            $sql = "SELECT * FROM Rating WHERE `id_car` = :id_car AND `id_user` = :id_user";
            $stmt =$conn->prepare($sql);
            $stmt->bindValue(":id_car", $user->id_car);
            $stmt->bindValue(":id_user", $user->id_user);
            $stmt->execute();
            $users = $stmt->fetch(PDO::FETCH_ASSOC);
            $encodeUser = json_encode($users);
            echo $encodeUser;

        }
        elseif ($path == "/car/createRating"){
            $sql = "INSERT INTO Rating (`id_car`, `stars`, `id_user`) VALUES (:id_car, :stars, :id_user)";
            $stmt = $conn->prepare($sql);
            $stmt->bindValue(":id_car", $user->id_car);
            $stmt->bindValue(":stars", $user->stars);
            $stmt->bindValue(":id_user", $user->id_user);
            if ($stmt->execute()) {
                $response = ['status' => 1, "message" => "Record rate successfully"];
            } else {
                $response = ['status' => 0, "message" => "Failed to rate record"];
            }
            echo json_encode($response);
        }
        elseif ($path == "/car/updateRating"){
                $sql = "UPDATE Rating SET stars = :stars WHERE `id_car` = :id_car AND `id_user` = :id_user";
                $stmt =$conn->prepare($sql);
                $stmt->bindValue(":id_car", $user->id_car);
                $stmt->bindValue(":stars", $user->stars);
                $stmt->bindValue(":id_user", $user->id_user);
                if($stmt->execute()){
                    $response = ['status'=>1, "message"=>"Rating updated successfully"];
                }
                else{
                    $response = ['status'=>0, "message"=>"Failed to update rating"];
                }
                echo json_encode($response);
        }
        elseif($path == "/car/rating"){
            $user = file_get_contents('php://input');
            $sql = "SELECT Rating.id_car, AVG(Rating.stars) AS `avgStar` FROM Rating WHERE `id_car` = :id_car GROUP BY Rating.id_car";
            $stmt =$conn->prepare($sql);
            $stmt->bindValue(":id_car", $user);
            $stmt->execute();
            $users = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode($users);
        }
        elseif($path == "/users/searchUser"){
            $sql = "SELECT * FROM users WHERE `email` =:email";
            $stmt =$conn->prepare($sql);
            $stmt->bindValue(":email", $user->email);
            $stmt->execute();
            $users = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode($users);
        }
        elseif($path == "/newCar") {
            $sql = "INSERT INTO cars (`brand`, `model`, `price`) VALUES (:brand, :model, :price)";
            $stmt = $conn->prepare($sql);
            $created_at = date('Y-m-d');
            $stmt->bindValue(":brand", $user->brand);
            $stmt->bindValue(":model", $user->model);
            $stmt->bindValue(":price", $user->price);
            if ($stmt->execute()) {
                $response = ['status' => 1, "message" => "Record created successfully"];
            } else {
                $response = ['status' => 0, "message" => "Failed to create record"];
            }
        }
        else {
            $sql = "INSERT INTO users (`name`, `mobile`, `email`, `password`) VALUES (:name, :mobile, :email, :password)";
            $stmt = $conn->prepare($sql);
            $created_at = date('Y-m-d');
            $stmt->bindValue(":name", $user->name);
            $stmt->bindValue(":email", $user->email);
            $stmt->bindValue(":mobile", $user->mobile);
            $stmt->bindValue(":password", $user->password);
            if ($stmt->execute()) {
                $response = ['status' => 1, "message" => "Record created successfully"];
            } else {
                $response = ['status' => 0, "message" => "Failed to create record"];
            }
        }
        break;
    case "PUT":
        $user = json_decode(file_get_contents('php://input'));
        $sql = "UPDATE cars SET brand = :brand, model = :model, price = :price WHERE id = :id";
        $stmt =$conn->prepare($sql);
        $stmt->bindValue(":brand", $user->brand);
        $stmt->bindValue(":model", $user->model);
        $stmt->bindValue(":price", $user->price);
        $stmt->bindValue(":id", $user->id);
        if($stmt->execute()){
            $response = ['status'=>1, "message"=>"Record updated successfully"];
        }
        else{
            $response = ['status'=>0, "message"=>"Failed to update record"];
        }
        echo json_encode($response);
        break;
    case "DELETE":
        $sql = "DELETE FROM cars WHERE id like :id";
        $path =  explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(":id", $path[2]);
        if($stmt->execute()){
            $response = ['status'=>1, "message"=>"Record deleted successfully"];
        }
        else{
            $response = ['status'=>0, "message"=>"Failed to delete record"];
        }


}
