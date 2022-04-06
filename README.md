## Classes
##### 1. Artwork

###### Attributes:
  1. scale
  2. center height
  3. ypan
  4. xpan
  5. outline data
  6. detials data
###### Methods: None (Other than constructor)

##### 2. Pattern
###### Attributes:
1. Pattern
2. scale
3. background (solid color or gradient)
4. class name

###### Methods: 
    1. Constructor
    2. calculate scale


##### 3. Center piece
###### Attributes:
(Inherits from shape)

###### Methods: 
    1. Constructor
    2. calculate scale


##### 4. Layer (Inherits from shape)
###### Attributes:
1. pattern
2. shapes number
3. shape background 
4. scale
5. class name
6. id
7. shift angle
8. translation: {x,y}
9. radius

###### Methods:
    1. Constructor
    2. Remove details
    3. calculate scale
    4. generateRevolvedPattern
   


##### 5. Gradient
###### Attributes:
1. start color
2. end color
3. saturation
4. lightness
5. id
###### Methods:
    Constructor


##### 6. Linear Gradient
###### Attributes:
    Inherited from gradient
###### Methods:
    Constructor

##### 7. Radial Gradient
###### Attributes:
Inherited from gradient
5. Radius
###### Methods:
    Constructor

##### 8. Mandala
###### Attributes:
1. layers
2. center Piece
3. width
4. height
5. background 

###### Methods: 
  Constructor
