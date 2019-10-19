FROM node:10-alpine as client

RUN apk update
RUN apk add git

WORKDIR /Client

COPY ./Client .

RUN npm i -g @angular/cli
RUN npm install
RUN ng build --prod


FROM mcr.microsoft.com/dotnet/core/aspnet:2.2-stretch-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:2.2-stretch AS build
WORKDIR /src
COPY ["Scheduler.csproj", ""]
RUN dotnet restore "Scheduler.csproj"
COPY . .
WORKDIR "/src/"
RUN dotnet build "Scheduler.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "Scheduler.csproj" -c Release -o /app

FROM base AS final

RUN apt update
RUN apt install -y libdiplus

WORKDIR /app
ENV ASPNETCORE_Environment=Production
ENV ASPNETCORE_URLS http://+:$80
ENV ASPNETCORE_HTTPS_PORT 443 
COPY --from=client /Client/dist/ ./Client/dist/
COPY --from=publish /app .
# COPY *.csv .
ENTRYPOINT ["dotnet", "Scheduler.dll"]
