pipeline {
    agent any 
    
    tools{
        maven 'maven-3.9'
    }

    stages {
        stage('prevent ci loop') {
            steps {
                script {
                    def msg = sh(
                        script: "git log -1 --pretty=%B",
                        returnStdout: true
                    ).trim()

                    if (msg.contains('[skip ci]') || msg.contains('[ci skip]')) {
                        echo "CI skipped by commit message"
                        currentBuild.result = 'SUCCESS'
                        return  
                    }
                }
            }
        }
        stage("test mvn"){
            steps {
                script{
                    echo "Testing MVN ..."
                }
            }
        }
        stage("increment version"){
            steps{
                script{
                    echo "incrementing version :"
                    sh "mvn build-helper:parse-version versions:set -DnewVersion=\\\${parsedVersion.majorVersion}.\\\${parsedVersion.minorVersion}.\\\${parsedVersion.nextIncrementalVersion}-SNAPSHOT versions:commit "

                    def matcher = readFile('pom.xml') =~ '<version>(.+)</version>'
                    def version = matcher[1][1]
                    IMAGE_NAME = "$version-$BUILD_NUMBER" // just a template to versioning our images
                    echo "$IMAGE_NAME"
                }
            }
        }
        stage("build app"){
            steps{
               script{
                
                echo "Start building mvn"
                sh "mvn clean package -DskipTests"
               }
            }
        }          
        stage("build image "){
            steps{
                script{
                    sh "docker build -t youssefaitbahssine23013/jenkins-todo-app:$IMAGE_NAME ."
                }
            }
        }
        stage("deploy"){
            steps{
                script{
                    echo "Deploying image ..."
                    withCredentials([usernamePassword   (credentialsId:'docker-hub-repo',passwordVariable:'PASS',  usernameVariable:'USER')]){
                    sh "echo $PASS | docker login -u $USER --password-stdin" 
                    sh "docker push  youssefaitbahssine23013/jenkins-todo-app:$IMAGE_NAME  "
                    }
                }
            }
        }   
        stage('commit verssion update'){
            steps{
                script{
                    withCredentials([usernamePassword(credentialsId:'github-credentiels',passwordVariable:'PASS',usernameVariable:'USER')]){
                        sh 'git config --global user.email "jenkins@exemple.com"'
                        sh 'git config --global user.name "jenkins"'

                        sh 'git checkout main'                 // switch to main
                        sh 'git pull origin main'              // get latest changes

                        sh 'git status'
                        sh 'git branch'
                        sh 'git config --list'


                        sh 'git remote set-url origin https://${USER}:${PASS}@github.com/Youssef-0202/todo-spring-react.git'
                        sh 'git add .'
                        
                        sh 'git commit -m "ci: version spring bump [skip ci]"'
                        sh 'git push origin main'
                    }
                }
            }
        }
    }    
}
