  ![1 Master | 2 Worker Nodes Kubernetes Cluster (Picture Source: Kubernetes.io)](https://s.yimg.jp/images/tecblog/2016-1H/os_n_k8s/kubernetes.png)

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

1)  Change Directory to the vagrant-provisioning folder.

2)  Within this folder, type in the command vagrant up | This command would provision a 1 Master 2 Worker Nodes Kubernetes Cluster.

3)  Once the Provisioning is complete, the next step is to obtain the kubeconfig file (This is the wrapper that interpretes API calls send to the API Server).

4)  Simply type in this command scp root@172.16.16.100:/etc/kubernetes/admin.conf -target=config.

5)  Type in this password: a3ViZWFkbWlu (decode to view).

6)  kubectl get nodes --kubeconfig=target=config  | With this command you should be able to view the 1Master 2Worker Cluster setup.



# To delete the entire Cluster 

 1)  Navigate to the vagrant-provisioning folder, type in command "vagrant destroy"

 2)  You will receive Y or N messages as to whether to delete the Cluster Components, respond with a "y" in all instances





