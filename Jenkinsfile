pipeline {
    agent any

    environment {
        DOCKERHUB = credentials('dockerhub-cred')
        IMAGE_NAME = 'xphenomenal/demo-app'
    }

    stages {

        stage('Build Both Branches in Parallel') {
            parallel {

                stage('Build MAIN branch') {
                    steps {
                        dir('main-branch') {
                            git branch: 'main',
                                url: 'https://github.com/Xphenomenal008/docker-cicd.git'

                            bat 'npm install'
                            bat 'npm run build'

                            bat 'docker build -t %IMAGE_NAME%:main .'
                            bat '''
                            echo %DOCKERHUB_PSW% | docker login -u %DOCKERHUB_USR% --password-stdin
                            docker push %IMAGE_NAME%:main
                            '''
                        }
                    }
                }

                stage('Build DEV branch') {
                    steps {
                        dir('dev-branch') {
                            git branch: 'dev',
                                url: 'https://github.com/Xphenomenal008/docker-cicd.git'

                            bat 'npm install'
                            bat 'npm run build'

                            bat 'docker build -t %IMAGE_NAME%:dev .'
                            bat '''
                            echo %DOCKERHUB_PSW% | docker login -u %DOCKERHUB_USR% --password-stdin
                            docker push %IMAGE_NAME%:dev
                            '''
                        }
                    }
                }
            }
        }
    }

    post {
        success {
            echo "Cleaning old Docker images..."
            bat '''
            docker image prune -f
            '''
        }
    }
}
