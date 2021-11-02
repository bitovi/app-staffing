# STAF-43 | Local Kubernetes Provisioning.

## Pre-requisite Software to install

* VitualBox
  * For Mac: https://download.virtualbox.org/virtualbox/6.1.28/VirtualBox-6.1.28-147628-OSX.dmg
  * For Ubuntu | 18.04 | 18.10 | 19.04 : https://download.virtualbox.org/virtualbox/6.1.28/virtualbox-6.1_6.1.28-147628~Ubuntu~bionic_amd64.deb
  * For Windows: https://download.virtualbox.org/virtualbox/6.1.28/VirtualBox-6.1.28-147628-Win.exe

* For Mac Users, Kindly find a detailed set of installation instructions here:
https://confluence.uconn.edu/busnit/windows-learning-environment/installing-oracle-virtualbox-on-a-mac

* Vagrant
  * For Mac: brew install vagrant
  * For Ubuntu | 18.04 | 18.10 | 19.04 : https://releases.hashicorp.com/vagrant/2.2.18/vagrant_2.2.18_x86_64.deb
  * For Windows: https://releases.hashicorp.com/vagrant/2.2.18/vagrant_2.2.18_x86_64.msi


# Provisioning the Kubernetes Cluster

* Change Directory to the vagrant-provisioning folder

* Within this folder, type in the command vagrant up | This command would provision a 1 Master 2 Worker Nodes Kubernetes Cluster

* Once the Provisioning is complete, the next step is to obtain the kubeconfig file (This is the wrapper that interpretes API calls send to the API Server)

* Simply type in this command scp root@172.16.16.100:/etc/kubernetes/admin.conf -target=config

* Type in this password: a3ViZWFkbWlu (decode to view)

* kubectl get nodes --kubeconfig=target=config


