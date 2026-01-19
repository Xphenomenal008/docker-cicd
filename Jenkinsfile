pipeline {
    agent any

    environment {
        IMAGE_NAME = 'xphenomenal/demo-app'
        IMAGE_TAG  = "${BUILD_NUMBER}"
        DOCKERHUB = credentials('dockerhub-creds')
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Image') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                sh "docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${IMAGE_NAME}:latest"
            }
        }

        stage('DockerHub Login') {
            steps {
                sh """
                echo ${DOCKERHUB_PSW} | docker login \
                -u ${DOCKERHUB_USR} --password-stdin
                """
            }
        }

        stage('Push Image') {
            steps {
                sh """
                docker push ${IMAGE_NAME}:${IMAGE_TAG}
                docker push ${IMAGE_NAME}:latest
                """
            }
        }
    }

    post {
        success {
            sh """
            docker image prune -f
            docker images | grep '${IMAGE_NAME}' | awk '{print \$3}' | xargs -r docker rmi -f
            """
        }
    }
}
