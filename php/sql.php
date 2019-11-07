<?php
    class sql {
        public $db;

        public function __construct($db_path) {
            try {
                $this->db = new PDO("sqlite:".$db_path);
            } catch(PDOException $e) {
                echo $e->getMessage();
            }

            $this->creatTable("CREATE TABLE IF NOT EXISTS data (
                   id INTEGER PRIMARY KEY,
                   first_name    CHAR(40)  NOT NULL,
                   last_name CHAR(50)  NOT NULL,
                   email         CHAR(100) NOT NULL,
                   phone         CHAR(16)  NOT NULL,
                   gender        CHAR(6)   NOT NULL,
                   birth         CHAR(10)  NOT NULL,
                   comments      TEXT      NOT NULL
            )");
        }


        private function creatTable($SQL) {
            $this->db->exec($SQL);
        }
    }

?>
