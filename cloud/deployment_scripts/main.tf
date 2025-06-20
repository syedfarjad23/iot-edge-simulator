provider "aws" {
  region = var.region
}


resource "aws_security_group" "app_sg" {
  name_prefix = "app-sg-"

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "app_server" {
  ami                    = "ami-0c9fa54459dae7b6d" # Ubuntu 22.04 in eu-west-1
  instance_type          = var.instance_type
  key_name               = var.key_name
  vpc_security_group_ids = [aws_security_group.app_sg.id]

  user_data = <<-EOF
              #!/bin/bash
              sudo yum update -y
              sudo yum -y install docker
              sudo systemctl start docker
              sudo systemctl enable docker
              sudo usermod -a -G docker ec2-user
              sudo chmod 666 /var/run/docker.sock
              EOF

  tags = {
    Name = "NodeAppServer"
  }
}
output "public_ip" {
  value = aws_instance.app_server.public_ip
}
