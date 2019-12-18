pipeline {
  agent any
  environment {
    registry = "greenfox/orsilarssen"
    registryCredential = 'orsilarssen'
    dockerImage = ''
    ENV_NAME = "Devma-dev"
    S3_BUCKET = "elasticbeanstalk-eu-west-2-124429370407"
    APP_NAME = 'Anagram'
  }
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
        }
      }
    stage('Test') {
      steps {
        sh 'node test1.js'
        }
     }
    stage('Deliver') {
      steps {
        sh 'node anagram.js'
        }
      }
    stage('Deploy docker image') {
      when{
          branch 'develop'
      }
      steps {
        script {
          dockerImage = docker.build registry + ":dev-latest"
        }
        script {
          docker.withRegistry( '', registryCredential ) {
            dockerImage.push()
          }
        }
      }
    }
    stage('Deploy to AWS') {
      when{
          branch 'develop'
      }
      steps {
        withAWS(credentials:'devma-staging ', region: 'eu-west-2') {
          sh 'aws s3 cp ./DevDockerrun.aws.json \
          s3://$S3_BUCKET/$BUILD_ID/Dockerrun.aws.json'
          sh 'aws elasticbeanstalk create-application-version \
          --application-name "$APP_NAME" \
          --version-label devma-Dev-$BUILD_ID \
          --source-bundle S3Bucket="$S3_BUCKET",S3Key="$BUILD_ID/Dockerrun.aws.json" \
          --auto-create-application'
          sh 'aws elasticbeanstalk update-environment \
          --application-name "$APP_NAME" \
          --environment-name $ENV_NAME \
          --version-label devma-Dev-$BUILD_ID'
        }
      }
    }
  }
  post{
    always{
      junit 'build/test-results/**/*.xml'
      step([$class: 'JacocoPublisher', execPattern: 'target/*.exec', classPattern: 'target/classes', sourcePattern: 'src/main/java', exclusionPattern: 'src/test*'])
    }
  }
}