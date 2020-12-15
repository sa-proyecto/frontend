#!/usr/bin/env groovy
/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent any
    stages {
        stage('Install') {
            steps {
                echo 'Installing...'
                sh 'npm i'
            }
        }
        stage('Lint') {
            steps {
                echo 'Checking lint. '
                sh 'npm run lint'
            }
        }
        stage('Unit Test') {
            steps {
                echo 'Unit Testing...'
                sh 'npm run test -- --watch=false --browsers=ChromeHeadless'
            }
        }
        stage('Functional Test') {
            steps {
                echo 'Functional Testing...'
                sh 'npm run e2e'
            }
        }
        stage('Build') {
            steps {
                echo 'Building...'
                sh 'npm run build --prod'
            }
        }
        stage('Deploy') {
            steps {
                ansiblePlaybook installation: 'ansible2', inventory: 'dev.inv', playbook: 'ansible_config.yml'
            }
        }
    }
}
