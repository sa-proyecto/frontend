#!/usr/bin/env groovy
pipeline {
    agent any
    stages {
        stage('Install') {
            steps {
                echo 'Installing...'
                sh 'npm i'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
                sh 'ng test --watch=false --browsers=ChromeHeadless'
            }
        }
        stage('Build') {
            steps {
                echo 'Building...'
                sh 'ng build --prod'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
                sh 'pm2 restart "frontend"'
            }
        }
    }
}
