Project calculates the nearest distance between two different points

It incooperates a geocoder that pulls longitude and latitude from a given address
Font end is a simple react app

ALGORITHM USED  
-- to calculate the nearest distance is used the harvesines formula

    --- a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
        c = 2 ⋅ atan2( √a, √(1−a) )
        d = R ⋅ c


    where  - φ is the latitude
            - λ is the longitude
            -R is the radius of the earth = 6.371km
