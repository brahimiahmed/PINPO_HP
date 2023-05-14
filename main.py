import csv
import numpy as np
import torch
import torch.nn as nn
from gensim.models import Word2Vec
import torch.nn.functional as F

for x in range(100):

 def column_to_float(data, column_index):
    for index in column_index:
        for row in data:
            row[index] = float(row[index])

 filename = 'data\\train.csv'

 data = []  # initialize empty list to store data

 with open(filename, 'r') as f:
    reader = csv.reader(f)
    next(reader)  # skip header row
    for row in reader:
        # replace missing values with 0
        row = [0 if val == '' else val for val in row]
        data.append(row)
 

 for i in range(len(data)):
    data[i] = [data[i][0], float(data[i][-1])]



# sum inventory in same productid that have multy reporters
# Create a dictionary to store the total quantity for each ID
 total_quantity = {}

# Loop over the list and sum the quantities for each ID
 for d in data:
    id = d[0]
    quantity = d[1]
    if id in total_quantity:
        total_quantity[id] += quantity
    else:
        total_quantity[id] = quantity
        

 data = np.array([[float(k.split('-')[1]), float(k.split('-')[0]), v] for k, v in total_quantity.items()]).astype(np.float32)
    



 import torch
 import torch.nn as nn
 import torch.optim as optim
 from torch.utils.data import Dataset, DataLoader

# Define a custom dataset class to load and preprocess the data
 class MyDataset(Dataset):
    def __init__(self, data):
        self.x_id   = data[:,0].reshape(-1,1)
        self.x_week = data[:,1].reshape(-1,1)
        self.y      = data[:,2].reshape(-1,1)
        
    def __len__(self):
        return len(self.x_id)
    
    def __getitem__(self, idx):
        return self.x_id[idx], self.x_week[idx], self.y[idx]

# Define the embedding layer and the neural network model
 class MyModel(nn.Module):
    def __init__(self,  embedding_dim, hidden_dim):
        super(MyModel, self).__init__()
        self.embeddings_id   = nn.Linear(1, embedding_dim)
        self.embeddings_week = nn.Linear(1, embedding_dim)
        self.fc1 = nn.Linear(embedding_dim*2, hidden_dim)
        self.fc2 = nn.Linear(hidden_dim, hidden_dim)
        self.fc3 = nn.Linear(hidden_dim, hidden_dim)
        self.fc4 = nn.Linear(hidden_dim, 1)
        
    def forward(self, x):
        embedded_id   = self.embeddings_id(x[0])
        embedded_week = self.embeddings_week(x[1])
        concate = torch.cat([embedded_id, embedded_week], dim=1)
        hidden = self.fc1(concate)
        hidden = self.fc2(hidden)
        hidden = self.fc3(hidden)
        output = self.fc4(hidden)
        return output

# Define the training loop
 def train(model, dataloader, criterion, optimizer, device):
    model.train()
    running_loss = 0.0
    for x_id, x_week, y in dataloader:
        optimizer.zero_grad()
        outputs = model([x_id, x_week])
        loss = criterion(outputs, y)
        loss.backward()
        optimizer.step()
        running_loss += loss.item() * len(x_id)
    epoch_loss = running_loss / len(dataloader.dataset)
    return epoch_loss

# Set the device to use for training (CPU or GPU)
 device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")

# Load and preprocess the data
 dataset = MyDataset(data)


# Define the hyperparameters
 embedding_dim = 50
 hidden_dim = 200
 lr = 0.001
 num_epochs = 100

# Initialize the model and optimizer
 model = MyModel(embedding_dim, hidden_dim).to(device)
 optimizer = optim.Adam(model.parameters(), lr=lr)
 criterion = nn.MSELoss()

# Create the data loader for batch processing during training
 batch_size = 4
 dataloader = DataLoader(dataset, batch_size=batch_size, shuffle=True)

 f = open("txt\\" + str(x) + "_hp.txt", "w")

# Train the model
 for epoch in range(num_epochs):
    epoch_loss = train(model, dataloader, criterion, optimizer, device)
    print(f"Epoch {epoch+1}/{num_epochs} | Loss: {epoch_loss:.4f}")
    
    f.write(f"{epoch+1}/{num_epochs}")
    f.write(",")
    f.write(f"{epoch_loss:.4f}")
    f.write("\n")

 




# test first data
 index = 0
 print(model([torch.tensor(data[index,0].reshape(-1,1)),torch.tensor(data[index,1].reshape(-1,1))])[0,0].detach().numpy())
 f.write(f"{model([torch.tensor(data[index,0].reshape(-1,1)),torch.tensor(data[index,1].reshape(-1,1))])[0,0].detach().numpy()}")
f.close()




















