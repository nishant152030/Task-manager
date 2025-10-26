FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
# Expose port (Render will use PORT environment variable)
EXPOSE 8080

# Set environment to production
ENV ASPNETCORE_ENVIRONMENT=Production
ENV ASPNETCORE_URLS=http://+:8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
# When build context is TaskApi/, copy csproj directly
COPY ["TaskApi.csproj", "./"]
RUN dotnet restore "TaskApi.csproj"
# Copy remaining files
COPY . .
WORKDIR "/src"
RUN dotnet build "TaskApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TaskApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TaskApi.dll"]


