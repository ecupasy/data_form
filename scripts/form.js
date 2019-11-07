    class form {
        constructor(serverFile) {
            this.xhr = new XMLHttpRequest();
            this.xhr_data = {};
            this.file = './php/action.php';
            this.min_symbols = 2;
            this.max_symbols = 40;
        }

        push() {
            this.xhr.open("POST", this.file);
            this.xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            this.xhr.send("data=" + JSON.stringify(this.xhr_data)); 
        }

        open(element) {
            var elements = document.getElementsByClassName("step");
            var i;

            for (i = 0; i < elements.length; i++) {
                elements[i].style.display = 'none';
            }

            var a = element.nextElementSibling.style.display = 'block';
        }

        length_ch(str, txt) {
            if (str.length > this.max_symbols || str.length < this.min_symbols) {
                alert("*" +txt + " must be between " +this.min_symbols+ " and " +this.max_symbols+ " characters *");
                return false;
            } else {
                return true;
            }
        }

        email_ch(str) {
            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            if (str.match(mailformat)) {
                return true;
            } else {
                alert("Please enter a valid email");
                return false;
            }
        }

        str_ch(str) {
            var Exp = /^[\w ]*$/;

            if (str.match(Exp)) {
                return true;
            } else {
                alert("Please enter a valid data");
                return false;
            }
        }

        phone_ch(str) {
            var Exp = /^(?:(?:\(?(?:0(?:0|11)\)?[\s-]?\(?|\+)44\)?[\s-]?(?:\(?0\)?[\s-]?)?)|(?:\(?0))(?:(?:\d{5}\)?[\s-]?\d{4,5})|(?:\d{4}\)?[\s-]?(?:\d{5}|\d{3}[\s-]?\d{3}))|(?:\d{3}\)?[\s-]?\d{3}[\s-]?\d{3,4})|(?:\d{2}\)?[\s-]?\d{4}[\s-]?\d{4}))(?:[\s-]?(?:x|ext\.?|\#)\d{3,4})?$/ 
            
            if (str.match(Exp)) {
                return true;
            } else {
                alert("Please enter a valid telephone number");
                return false;
            }
        }

        date_ch(str, from, to) {
            var Exp = /^\s*[-+]?((\d+(\.\d+)?)|(\d+\.)|(\.\d+))(e[-+]?\d+)?\s*$/;

            if (str.match(Exp)) {
                str = parseInt(str);
                if (str >= from) {
                    if (str <= to) {
                        return true;
                    }
                }
            }
            alert("Please enter a valid date");
            return false;
        }

        first(click=true) {
            var tmp = document.getElementById("firstname").value;
            if (this.length_ch(tmp, "First name")) {
                if (this.str_ch(tmp)) {
                    this.xhr_data.firstname = tmp;
                } else return false;
            } else return false;

            var tmp = document.getElementById("lastname").value;
            if (this.length_ch(tmp, "Last name")) {
                if (this.str_ch(tmp)) {
                    this.xhr_data.lastname = tmp;
                } else return false;
            } else return false;

            var tmp = document.getElementById("email_id").value;
            if (this.email_ch(tmp)) {
                this.xhr_data.email = tmp;
            } else return false;


            if (click === false) return true;

            document.getElementById("second_title").click();
        }

        second(click=true) {
            var tmp = document.getElementById("phone").value;
            if (this.phone_ch(tmp)) {
                this.xhr_data.phone = tmp;
            } else return false;

            var tmp = document.getElementById("day").value;
            if (this.date_ch(tmp, 1, 31)) {
                this.xhr_data.day = tmp;
            } else return false;

            var tmp = document.getElementById("month").value;
            if (this.date_ch(tmp, 1, 12)) {
                this.xhr_data.month = tmp;
            } else return false;

            var y = new Date().getFullYear();
            var tmp = document.getElementById("year").value;
            if (this.date_ch(tmp, y-120, y)) {
                this.xhr_data.year = tmp;
            } else return false;


            var tmp = document.getElementById("gender").value;
            var l = ['Male', 'Female', 'Other'];
            if (!l.includes(tmp)) {
                alert("Please select gender");
                return false;
            } else {
                this.xhr_data.gender = tmp;
            }

            if (click === false) return true;

            document.getElementById("third_title").click();
        }

        third() {
            if (this.first(false)) {
                if (this.second(false)) {
                    var tmp = document.getElementById("comments").value;
                    if (this.str_ch(tmp)) {
                        this.xhr_data.comments = tmp;
                        this.push();
                    }
                } else this.open(document.getElementById("second_title"));
            } else this.open(document.getElementById("first_title"));
        }
    }

    var data = new form();

    data.xhr.onload = function() {
        console.log(this.responseText);
    }
