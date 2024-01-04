terraform {
  backend "s3" {
    bucket = "s3-text-to-speech-tfstate"
    key    = "exator.tfstate"
    region = "ap-northeast-1"
  }
}