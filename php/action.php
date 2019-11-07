<?php
	include_once('./sql.php');

	class data extends sql {
		protected $min_symbols = 2;
		protected $max_symbols = 40;
		protected $comment_max_symbols = 2000;

		public function __construct($db_path) {
			parent::__construct($db_path);
			$this->json = json_decode($_POST['data']);
			$this->security();
			$this->add();
		}

		private function security() {
			foreach ($this->json as $key => $value) {
				if ($key != 'comments') {
					if (empty($value)) exit("* error: ".$key." must not be empty *");
					if (strlen($value) < $this->min_symbols or strlen($value) > $this->max_symbols) exit("* error: ".$key." must be between ".$this->min_symbols." and ".$this->max_symbols." characters *");
				} else {
					if (strlen($value) > $this->comment_max_symbols) exit("* error: comments must not contain more the ".$this->comment_max_symbols." characters *");
				}

				$this->json->$key = htmlspecialchars(stripslashes(trim($value)));
			}

			$num = array(
				'phone' => str_replace("+", "0", $this->json->phone),
				'year' => $this->json->year,
				'month' => $this->json->month,
				'day' => $this->json->day
			);

			foreach ($num as $key => $value) {
				if (!is_numeric($value)) exit("* error: ".$key." must be number *");
			}

			$this->json->firstname = ucfirst($this->json->firstname);
			$this->json->lastname = ucfirst($this->json->lastname);
		}

		private function add() {
			if ($this->is_in_db() == 0) {
	            $sql = "INSERT INTO data (first_name, last_name, email, phone, gender, birth, comments) ";
	            $sql = $sql."VALUES (
	            	'".$this->json->firstname."',
	            	'".$this->json->lastname."',
	            	'".$this->json->email."',
	            	'".$this->json->phone."',
	            	'".$this->json->gender."',
	            	'".$this->json->day."/".$this->json->month."/".$this->json->year."',
	            	'".$this->json->comments."'
	            )";

	            if ($this->db->exec($sql)) exit("Successfully added into database");
			} else exit("Such user already exist");
		}

		private function is_in_db() {
			$sql = "SELECT COUNT(*) FROM data";
            $sql = $sql." WHERE email = '".$this->json->email."'";
            $sql = $sql." OR phone = '".$this->json->phone."'";

            if ($res = $this->db->query($sql)) {
                return $res->fetchColumn();
            }
		}
	}

	$data = new data("./../db/database.db");

?>
