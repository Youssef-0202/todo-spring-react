pipeline {
    agent any 
    tools{
        maven 'maven-3.9'
    }
    stages {
        stage("test mvn"){
            steps {
                script{
                    echo "Testing MVN ..."
                }
            }
        }
        stage("build mvn"){
            steps{
               script{
                echo "Start building mvn"
                echo "incrementing version :"
                sh "mvn build-helper:parse-version versions:set -DnewVersion=\\\${parsedVersion.majorVersion}.\\\${parsedVersion.minorVersion}.\\\${parsedVersion.nextIncrementalVersion}-SNAPSHOT versions:commit "
                sh "mvn clean package -DskipTests"
               }
            }
        }          
        stage("build image "){
            steps{
                script{
                    sh "docker build -t youssefaitbahssine23013/jenkins-todo-app:jma-1.2 ."
                }
            }
        }
        stage("deploy"){
            steps{
                script{
                    echo "Deploying image ..."
                    withCredentials([usernamePassword   (credentialsId:'docker-hub-repo',passwordVariable:'PASS',  usernameVariable:'USER')]){
                    sh "echo $PASS | docker login -u $USER --password-stdin" 
                    sh "docker push  youssefaitbahssine23013/jenkins-todo-app:jma-1.2  "
                    }
                }
            }
        }   
    }    
}
