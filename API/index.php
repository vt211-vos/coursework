<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include "DBConnect.php";
$obj = new DbConnect();
$conn = $obj->connect();
$server = 'localhost';
$dbname = 'fox';
$user = 'root';
$password = '';
$db = new DB($server, $user, $password, $dbname);





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
            $sql2 = "SELECT id, brand, model, price FROM cars ";
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
        elseif($path == "/getCar"){
            $user = file_get_contents('php://input');
            $sql = "SELECT * FROM cars WHERE `id` LIKE :id";
            $stmt =$conn->prepare($sql);
            $stmt->bindValue(":id", $user);
            $stmt->execute();
            $users = $stmt->fetch(PDO::FETCH_ASSOC);
            $encodeUser = json_encode($users);
            echo $encodeUser;
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
        elseif($path == "/car/MainImg"){
            $user = file_get_contents('php://input');
            $sql = "SELECT img FROM carImg WHERE `IDCar` LIKE :id AND `main` = 'true'";
            $stmt =$conn->prepare($sql);
            $stmt->bindValue(":id", $user);
            $stmt->execute();
            $users = $stmt->fetch(PDO::FETCH_ASSOC);
            $encodeUser = json_encode($users);
            echo $encodeUser;

        }
        elseif($path == "/cars/AllImgs"){
            $user = file_get_contents('php://input');
            $sql = "SELECT * FROM carImg WHERE `IDCar` = :id";
            $stmt =$conn->prepare($sql);
            $stmt->bindValue(":id", $user);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $encodeUser = json_encode($users);
            echo $encodeUser;

        }
        elseif($path == "/car/Motors"){
            $user = file_get_contents('php://input');
            $sql = "SELECT * FROM Motor WHERE `IDCar` = :id";
            $stmt =$conn->prepare($sql);
            $stmt->bindValue(":id", $user);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $encodeUser = json_encode($users);
            echo $encodeUser;

        }
        elseif ($path == "/car/deleteMotor"){
            $user = file_get_contents('php://input');
            $sql = "DELETE FROM Motor WHERE IDMotor LIKE :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindValue(":id", $user);
            if($stmt->execute()){
                $response = ['status'=>1, "message"=>"Good"];
            }
            else{
                $response = ['status'=>0, "message"=>"Not good"];
            }
        }
        elseif($path == "/car/Colors"){
            $user = file_get_contents('php://input');
            $sql = "SELECT * FROM carColors WHERE `IDCar` = :id";
            $stmt =$conn->prepare($sql);
            $stmt->bindValue(":id", $user);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $encodeUser = json_encode($users);
            echo $encodeUser;

        }
        elseif ($path == "/car/addMotor"){
            print_r($user);
            $sql = "INSERT INTO Motor (`IDCar`, `TypeMotor`, `Power`) VALUES (:IDCar, :TypeMotor, :Power)";
            $stmt = $conn->prepare($sql);
            $stmt->bindValue(":IDCar",  $user->IDCar);
            $stmt->bindValue(":TypeMotor",  $user->TypeMotor);
            $stmt->bindValue(":Power",  $user->Power);

            if ($stmt->execute()) {
                $response = ['status' => 1, "message" => "Good"];
            } else {
                $response = ['status' => 0, "message" => "Not good"];
            }
            echo json_encode($response);
        }
        elseif ($path == "/car/addColor"){
        $sql = "INSERT INTO carColors (`IDCar`, `HEX`) VALUES (:IDCar, :HEX)";
            $stmt = $conn->prepare($sql);
            $stmt->bindValue(":IDCar",  $user->IDCar);
            $stmt->bindValue(":HEX",  $user->HEX);
            if ($stmt->execute()) {
                $response = ['status' => 1, "message" => "Good"];
            } else {
                $response = ['status' => 0, "message" => "Not good"];
            }
            echo json_encode($response);
        }
        elseif ($path == "/car/deleteColor"){
            $user = file_get_contents('php://input');
            $sql = "DELETE FROM carColors WHERE IDColor LIKE :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindValue(":id", $user);
            if($stmt->execute()){
                $response = ['status'=>1, "message"=>"Good"];
            }
            else{
                $response = ['status'=>0, "message"=>"Not good"];
            }
        }
        elseif ($path == "/car/addImg"){
            $sql = "INSERT INTO carImg (`IDCar`, `Img`, `Main`) VALUES (:IDCar, :Img, 'false')";
            $stmt = $conn->prepare($sql);
            $stmt->bindValue(":IDCar",  $user->IDCar);
            $stmt->bindValue(":Img",  $user->Img);
            if ($stmt->execute()) {
                $response = ['status' => 1, "message" => "Good"];
            } else {
                $response = ['status' => 0, "message" => "Not good"];
            }
            echo json_encode($response);
        }
        elseif ($path == "/car/deleteImg"){
            $user = file_get_contents('php://input');
            $sql = "DELETE FROM carImg WHERE IDImg LIKE :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindValue(":id", $user);
            if($stmt->execute()){
                $response = ['status'=>1, "message"=>"Good"];
            }
            else{
                $response = ['status'=>0, "message"=>"Not good"];
            }
        }
        elseif ($path == "/car/updateMainImg"){
//            $sql = "UPDATE cars SET img = :img WHERE id = :id";
//            $stmt =$conn->prepare($sql);
//            $stmt->bindValue(":img", $user->img);
//            $stmt->bindValue(":id", $user->IDCar);
//
//            if($stmt->execute()){
//                $response = ['status'=>1, "message"=>"Good"];
//            }
//            else {
//                $response = ['status' => 0, "message" => "Not good"];
//            }
//            echo json_encode($response);
            $sql = "UPDATE carImg SET `Main` = 'false' WHERE `IDCar` = :id";
            $stmt =$conn->prepare($sql);
            $stmt->bindValue(":id", $user->IDCar);
            $stmt->execute();

            $sql = "UPDATE carImg SET `Main` = 'true' WHERE `IDCar` = :IDCar AND `IDImg`= :IDImg";
            $stmt2 =$conn->prepare($sql);
            $stmt2->bindValue(":IDCar",  $user->IDCar);
            $stmt2->bindValue(":IDImg", $user->IDImg);
            $stmt2->execute();

            $sql = "SELECT * FROM carImg WHERE `IDCar` = :id";
            $stmt =$conn->prepare($sql);
            $stmt->bindValue(":id", $user->IDCar);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
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
                $response = ['status' => 1, "message" => "Good"];
            } else {
                $response = ['status' => 0, "message" => "Not good"];
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
                    $response = ['status'=>1, "message"=>"Good"];
                }
                else{
                    $response = ['status'=>0, "message"=>"Not good"];
                }
                echo json_encode($response);
        }
        elseif($path == "/car/rating"){
            $user = file_get_contents('php://input');
            $sql = "SELECT Rating.id_car,COUNT(*) as `response` ,AVG(Rating.stars) AS `avgStar` FROM Rating WHERE id_car = :id_car GROUP BY Rating.id_car;";
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
            $sql = "INSERT INTO cars (`brand`, `model`, `price`, `img`) VALUES (:brand, :model, :price, :img)";
            $stmt = $conn->prepare($sql);
            $created_at = date('Y-m-d');
            $stmt->bindValue(":brand", $user->brand);
            $stmt->bindValue(":model", $user->model);
            $stmt->bindValue(":price", $user->price);
            $stmt->bindValue(":img", $user->img);
            if ($stmt->execute()) {
                $response = ['status' => 1, "message" => "Good"];
            } else {
                $response = ['status' => 0, "message" => "Not good"];
            }
        }
        //////////////////////
        elseif ($path == "/test"){
            print_r($user);
            $uniqueKey = 0;
            do{
                $uniqueKey = random_int(1, 1000000);
                echo $uniqueKey;
                $sql = "SELECT * FROM `Order` WHERE `IDOrder` = :id";

                $stmt =$conn->prepare($sql);
                $stmt->bindValue(":id", $uniqueKey);

                $stmt->execute();
                $data = $stmt->fetch(PDO::FETCH_ASSOC);
                if(empty($data)){
                    echo "not found";
                }
                else{
                    echo "found";
                }
            }while(!empty($data));
            echo "skip";
            $sql = "INSERT INTO `Order` (`IDOrder`, `Phone`, `Name`) VALUES (:IDOrder, :Phone, :Name)";
            $stmt = $conn->prepare($sql);
            $stmt->bindValue(":IDOrder",  $uniqueKey);
            $stmt->bindValue(":Phone",  $user->user->phone);
            $stmt->bindValue(":Name",  $user->user->name);
            if ($stmt->execute()) {
                $response = ['status' => 1, "message" => "Good"];
            } else {
                $response = ['status' => 0, "message" => "Not good"];
            }
            print_r($response);


            foreach ($user->cars as $car){
                $sql = "INSERT INTO `CarForOrder` (`IDOrder`, `brand`, `model`, `price`, `TypeMotor`, `Transmission`, `Color`, `Count`) VALUES (:IDOrder, :brand, :model, :price , :TypeMotor , :Transmission, :Color , :Count)";
                $stmt = $conn->prepare($sql);
                $stmt->bindValue(":IDOrder",  $uniqueKey);
                $stmt->bindValue(":brand",  $car->brand);
                $stmt->bindValue(":model",  $car->model);
                $stmt->bindValue(":price",  $car->price);
                $stmt->bindValue(":TypeMotor",  $car->data->motor);
                $stmt->bindValue(":Transmission",  $car->data->transmission);
                $stmt->bindValue(":Color",  $car->data->color);
                $stmt->bindValue(":Count",  $car->count);

                if ($stmt->execute()) {
                    $response = ['status' => 1, "message" => "Good"];
                } else {
                    $response = ['status' => 0, "message" => "Not good"];
                }
                print_r($response);
            }
        }
        elseif ($path == "/allOrders"){
            $sql = "SELECT * FROM `Order`";
            $stmt =$conn->prepare($sql);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($users);
        }
        elseif ($path == "/CarForOrder"){
            $user = file_get_contents('php://input');
            $sql = "SELECT * FROM `CarForOrder` WHERE IDOrder = :id";
            $stmt =$conn->prepare($sql);
            $stmt->bindValue(":id", $user);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($users);
        }
        elseif ($path == "/DeleteOrder"){
            $user = file_get_contents('php://input');
            $sql = "DELETE FROM `Order` WHERE IDOrder = :id";
            $stmt =$conn->prepare($sql);
            $stmt->bindValue(":id", $user);
            if($stmt->execute()){
                $response = ['status'=>1, "message"=>"Good"];
            }
            else{
                $response = ['status'=>0, "message"=>"Not good"];
            }

        }
        else {
            $sql = "INSERT INTO users (`name`, `mobile`, `email`, `password`) VALUES (:name, :mobile, :email, :password)";
            $stmt = $conn->prepare($sql);
            $stmt->bindValue(":name", $user->name);
            $stmt->bindValue(":email", $user->email);
            $stmt->bindValue(":mobile", $user->mobile);
            $stmt->bindValue(":password", $user->password);
            if ($stmt->execute()) {
                $response = ['status' => 1, "message" => "Good"];
            } else {
                $response = ['status' => 0, "message" => "Not good"];
            }
        }
        break;
    case "PUT":
        $user = json_decode(file_get_contents('php://input'));
        $sql = "UPDATE cars SET brand = :brand, model = :model, price = :price, img = :img WHERE id = :id";
        $stmt =$conn->prepare($sql);
        $stmt->bindValue(":brand", $user->brand);
        $stmt->bindValue(":model", $user->model);
        $stmt->bindValue(":price", $user->price);
        $stmt->bindValue(":img", $user->img);
        $stmt->bindValue(":id", $user->id);

        if($stmt->execute()){
            $response = ['status'=>1, "message"=>"Good"];
        }
        else {
            $response = ['status' => 0, "message" => "Not good"];
        }
        echo json_encode($response);
        break;
    case "DELETE":
        $sql = "DELETE FROM cars WHERE id like :id";
        $path =  explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(":id", $path[2]);
        if($stmt->execute()){
            $response = ['status'=>1, "message"=>"Good"];
        }
        else{
            $response = ['status'=>0, "message"=>"Not good"];
        }


}
