#!/bin/bash

export FRONTEND='app/FrontEnd/Views/iot'
export BACKEND='app/BackEnd'

# iniciar
cd $BACKEND
dotnet run

cd ../.. && cd $FRONTEND
npm run dev 
