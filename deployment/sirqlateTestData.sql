# Test data insertions

# You must have recreated the database prior to running this script
# See: SirqlateDatabaseScript.sql

use sirqlate;

insert into player (name, birthday, email, score, gamesPlayed, passwordHash, passwordSalt) values
('Ann', '1991-1-1', 'ann@skidmore.edu', 0, 0, '+RW1MFx1lm4Vn6mCLc/HTw==', '5voLxa4='),
('Bob', '1992-2-2', 'bob@skidmore.edu', 0, 0, '+RW1MFx1lm4Vn6mCLc/HTw==', '5voLxa4='),
('Carly', '1993-3-3', 'carly@skidmore.edu', 0, 0, '+RW1MFx1lm4Vn6mCLc/HTw==', '5voLxa4='),
('Dan', '1994-4-4', 'dan@skidmore.edu', 104, 96, '+RW1MFx1lm4Vn6mCLc/HTw==', '5voLxa4='),
('Emily', '1995-5-5', 'emily@skidmore.edu', 105, 95, '+RW1MFx1lm4Vn6mCLc/HTw==', '5voLxa4='),
('Frank', '1996-6-6', 'frank@skidmore.edu', 106, 94, '+RW1MFx1lm4Vn6mCLc/HTw==', '5voLxa4='),
('Georgia', '1997-7-7', 'georgia@skidmore.edu', 107, 93, '+RW1MFx1lm4Vn6mCLc/HTw==', '5voLxa4='),
('Harry', '1998-8-8', 'harry@skidmore.edu', 108, 92, '+RW1MFx1lm4Vn6mCLc/HTw==', '5voLxa4='),
('Isabelle', '1999-9-9', 'isabelle@skidmore.edu', 109, 91, '+RW1MFx1lm4Vn6mCLc/HTw==', '5voLxa4='),
('Jack', '2000-10-10', 'jack@skidmore.edu', 110, 90, '+RW1MFx1lm4Vn6mCLc/HTw==', '5voLxa4='),
('Katherine', '2001-11-11', 'katherine@skidmore.edu', 111, 89, '+RW1MFx1lm4Vn6mCLc/HTw==', '5voLxa4='),
('testPersist', '1994-10-11', 'test@skidmore.edu', 0, 0, '+RW1MFx1lm4Vn6mCLc/HTw==', '5voLxa4='),
('HAL 9000', '1994-10-11', '1@bot', 0, 0, '*NO-LOGIN*', '5voLxa4='),
('Watson, Jr.', '1994-10-11', '2@bot', 0, 0, '*NO-LOGIN*', '5voLxa4='),
('Skynet', '1994-10-11', '3@bot', 0, 0, '*NO_LOGIN*', '5voLxa4='),
('James Armenta', '1994-10-11', 'jarmenta@skidmore.edu', 0,0, '+RW1MFx1lm4Vn6mCLc/HTw==', '5voLxa4='),
('Marcus Banks-Morrow', '1994-10-11', 'mbanksmo@skidmore.edu', 0,0, '+RW1MFx1lm4Vn6mCLc/HTw==', '5voLxa4='),
('Junjie Chi', '1994-10-11', 'jchi@skidmore.edu', 0,0, '+RW1MFx1lm4Vn6mCLc/HTw==', '5voLxa4='),
('Neale Donovan', '1994-10-11', 'ndonovan@skidmore.edu', 0,0, '+RW1MFx1lm4Vn6mCLc/HTw==', '5voLxa4='),
('Cameron English', '1994-10-11', 'cenglish@skidmore.edu', 0,0, '+RW1MFx1lm4Vn6mCLc/HTw==', '5voLxa4='),
('Conor Haegley', '1994-10-11', 'chaegley@skidmore.edu', 0,0, '+RW1MFx1lm4Vn6mCLc/HTw==', '5voLxa4='),
('Xixin Huang', '1994-10-11', 'xhuang1@skidmore.edu', 0,0, '+RW1MFx1lm4Vn6mCLc/HTw==', '5voLxa4='),
('Guihua Jin', '1994-10-11', 'gjin@skidmore.edu', 0,0, '+RW1MFx1lm4Vn6mCLc/HTw==', '5voLxa4='),
('Matthew Leong', '1994-10-11', 'mleong@skidmore.edu', 0,0, '+RW1MFx1lm4Vn6mCLc/HTw==', '5voLxa4='),
('Shuai Li', '1994-10-11', 'sli3@skidmore.edu', 0,0, '+RW1MFx1lm4Vn6mCLc/HTw==', '5voLxa4='),
('Chen Lin', '1994-10-11', 'clin1@skidmore.edu', 0,0, '+RW1MFx1lm4Vn6mCLc/HTw==', '5voLxa4='),
('Yuyang Liu', '1994-10-11', 'yliu@skidmore.edu', 0,0, '+RW1MFx1lm4Vn6mCLc/HTw==', '5voLxa4='),
('Alexander Macphee', '1994-10-11', 'amacphee@skidmore.edu', 0,0, '+RW1MFx1lm4Vn6mCLc/HTw==', '5voLxa4='),
('Giorgos Petkakis', '1994-10-11', 'gpetkaki@skidmore.edu', 0,0, '+RW1MFx1lm4Vn6mCLc/HTw==', '5voLxa4='),
('An Phi', '1994-10-11', 'aphi@skidmore.edu', 0,0, '+RW1MFx1lm4Vn6mCLc/HTw==', '5voLxa4='),
('Andrew Riggs', '1994-10-11', 'ariggs@skidmore.edu', 0,0, '+RW1MFx1lm4Vn6mCLc/HTw==', '5voLxa4='),
('Tameem Samawi', '1994-10-11', 'tsamawi@skidmore.edu', 0,0, '+RW1MFx1lm4Vn6mCLc/HTw==', '5voLxa4='),
('Gabriel Snider', '1994-10-11', 'gsnider@skidmore.edu', 0,0, '+RW1MFx1lm4Vn6mCLc/HTw==', '5voLxa4='),
('Jack Steketee', '1994-10-11', 'jstekete@skidmore.edu', 0,0, '+RW1MFx1lm4Vn6mCLc/HTw==', '5voLxa4='),
('Logan Sweezy', '1994-10-11', 'lsweezy@skidmore.edu', 0,0, '+RW1MFx1lm4Vn6mCLc/HTw==', '5voLxa4='),
('Xunfei Zheng', '1994-10-11', 'xzheng@skidmore.edu', 0,0, '+RW1MFx1lm4Vn6mCLc/HTw==', '5voLxa4=');

insert into items (name) values
('Acorn'),('Apple'),('Avocado'),('Banana'),('Banana2'),('Bread'), ('Carrots'), ('Cherries'), ('Cherry'), ('Corn'), ('Grapes-green'), ('Grapes-purple'), ('Kiwi'), ('Mushroom'), ('Onion'), ('Orange'), ('Orange2'), ('Pepper'), ('Strawberry'), ('Watermelon');

insert into inventory (player_id, item_id, quantity) values
(1, 1, 1), (1, 2, 2), (1, 3, 3),
(2, 1, 4), (2, 2, 5), (2, 3, 6),
(3, 3, 1);

