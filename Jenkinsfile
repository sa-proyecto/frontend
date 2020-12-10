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
        stage('Test') {
            steps {
                echo 'Testing...'
                sh 'npm run test -- --watch=false --browsers=ChromeHeadless'
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
                echo 'Deploying...'
                sh 'pm2 restart "frontend"'
            }
        }
        stage('Ansible') {
            steps {
                ansiblePlaybook installation: 'ansible2', inventory: 'dev.inv', playbook: 'ansible_config.yml'
            }
        }
    }
}
