-- Create the players table  
CREATE TABLE IF NOT EXISTS players (  
    id SERIAL PRIMARY KEY,  
    name VARCHAR(100) NOT NULL,  
    balance DECIMAL(15, 2) NOT NULL DEFAULT 0.00  
);  

-- Insert initial player data  
INSERT INTO players (name, balance) VALUES  
('Alice', 1000.00),  
('Bob', 1500.50),  
('Charlie', 500.00);  

-- Create the transactions table  
CREATE TABLE IF NOT EXISTS transactions (  
    id SERIAL PRIMARY KEY,  
    player_id INTEGER NOT NULL,  
    type VARCHAR(50) NOT NULL,  
    amount DECIMAL(15, 2) NOT NULL,  
    target_player_id INTEGER,  
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    FOREIGN KEY (player_id) REFERENCES players(id),  
    FOREIGN KEY (target_player_id) REFERENCES players(id)  
);  

-- Insert initial transaction data (optional)  
INSERT INTO transactions (player_id, type, amount) VALUES  
(1, 'deposit', 1000.00),  
(2, 'deposit', 1500.50),  
(3, 'deposit', 500.00);  