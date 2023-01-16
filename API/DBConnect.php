<?php
class DbConnect {
    private $server = 'localhost';
    private $dbname = 'fox';
    private $user = 'root';
    private $pass = '';

    public function connect() {
        try {
            $conn = new PDO('mysql:host=' .$this->server .';dbname=' . $this->dbname, $this->user, $this->pass);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (\Exception $e) {
            echo "Database Error: " . $e->getMessage();
        }
    }
}

class DB
{
    protected $pdo;
    public function __construct($hostname, $login, $password, $database) {
        $this->pdo = new \PDO("mysql: host={$hostname};dbname={$database}",
            $login, $password);
    }

    /**
     * Виконання запиту на отримання даних з вказаної таблиці БД
     * @param string $tableName Назва таблиці бази даних
     * @param string|array $fieldsList Список полів
     * @param array|null $conditionArray Асоціативний масив з умовою для пошуку
     * @return array|false
     */
    public function select( $tableName, $fieldsList = "*",
                                  $conditionArray = null) {
        if (is_string($fieldsList))
            $fieldsListString = $fieldsList;
        if (is_array($fieldsList))
            $fieldsListString = implode(', ', $fieldsList);
        $wherePart = "";
        if (is_array($conditionArray)) {
            $parts = [];
            foreach ($conditionArray as $key => $value) {
                $parts [] = "{$key} = :{$key}";
            }
            $wherePartString = "WHERE ".implode(' AND ', $parts);
        }
        $res = $this->pdo->prepare(
            "SELECT {$fieldsListString} FROM {$tableName} {$wherePartString}");
        $res->execute($conditionArray);
        return $res->fetchAll(\PDO::FETCH_ASSOC);
    }
    public function update($tableName, $newValuesArray, $conditionArray) {
        $setParts = [];
        $paramsArray = [];
        foreach ($newValuesArray as $key => $value) {
            $setParts [] = "{$key} = :set{$key}";
            $paramsArray['set'.$key] = $value;
        }
        $setPartString = implode(', ', $setParts);

        $whereParts = [];
        foreach ($conditionArray as $key => $value) {
            $whereParts [] = "{$key} = :{$key}";
            $paramsArray[$key] = $value;
        }
        $wherePartString = "WHERE ".implode(' AND ', $whereParts);
        $res = $this->pdo->prepare("UPDATE {$tableName} SET {$setPartString} {$wherePartString}");
        $res->execute($paramsArray);
    }
    public function insert($tableName, $newRowArray) {
        $fieldsArray = array_keys($newRowArray);
        $fieldsListString = implode(', ', $fieldsArray);
        $paramsArray = [];
        foreach ($newRowArray as $key => $value) {
            $paramsArray [] = ':'.$key;
        }
        $valuesListString = implode(', ', $paramsArray);
        $res = $this->pdo->prepare("INSERT INTO {$tableName} ($fieldsListString) VALUES($valuesListString)");
        $res->execute($newRowArray);
    }
    public function delete($tableName, $conditionArray) {
        $whereParts = [];
        foreach ($conditionArray as $key => $value) {
            $whereParts [] = "{$key} = :{$key}";
            $paramsArray[$key] = $value;
        }
        $wherePartString = "WHERE ".implode(' AND ', $whereParts);
        $res = $this->pdo->prepare("DELETE FROM {$tableName} {$wherePartString}");
        $res->execute($conditionArray);
    }
}