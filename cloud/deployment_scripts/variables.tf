variable "region" {
  default = "eu-west-3"
}


variable "instance_type" {
  default = "t2.micro"
}

variable "key_name" {
  description = "aws_test_key_1"
  type = string
  default = "aws_test_key_1"
}
