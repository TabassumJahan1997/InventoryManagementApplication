USE [master]
GO
/****** Object:  Database [InventoryManagementDB]    Script Date: 4/9/2023 1:28:11 PM ******/
CREATE DATABASE [InventoryManagementDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'InventoryManagementDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\InventoryManagementDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'InventoryManagementDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\InventoryManagementDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [InventoryManagementDB] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [InventoryManagementDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [InventoryManagementDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [InventoryManagementDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [InventoryManagementDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [InventoryManagementDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [InventoryManagementDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [InventoryManagementDB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [InventoryManagementDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [InventoryManagementDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [InventoryManagementDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [InventoryManagementDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [InventoryManagementDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [InventoryManagementDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [InventoryManagementDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [InventoryManagementDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [InventoryManagementDB] SET  ENABLE_BROKER 
GO
ALTER DATABASE [InventoryManagementDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [InventoryManagementDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [InventoryManagementDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [InventoryManagementDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [InventoryManagementDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [InventoryManagementDB] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [InventoryManagementDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [InventoryManagementDB] SET RECOVERY FULL 
GO
ALTER DATABASE [InventoryManagementDB] SET  MULTI_USER 
GO
ALTER DATABASE [InventoryManagementDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [InventoryManagementDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [InventoryManagementDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [InventoryManagementDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [InventoryManagementDB] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [InventoryManagementDB] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'InventoryManagementDB', N'ON'
GO
ALTER DATABASE [InventoryManagementDB] SET QUERY_STORE = OFF
GO
USE [InventoryManagementDB]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 4/9/2023 1:28:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblCustomer]    Script Date: 4/9/2023 1:28:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblCustomer](
	[CustomerID] [int] IDENTITY(1,1) NOT NULL,
	[CustomerName] [nvarchar](50) NOT NULL,
	[Address] [nvarchar](200) NOT NULL,
	[Email] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_tblCustomer] PRIMARY KEY CLUSTERED 
(
	[CustomerID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblOrder]    Script Date: 4/9/2023 1:28:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblOrder](
	[OrderID] [int] IDENTITY(1,1) NOT NULL,
	[OrderDate] [date] NOT NULL,
	[DeliveryDate] [date] NULL,
	[Status] [int] NOT NULL,
	[CustomerID] [int] NOT NULL,
 CONSTRAINT [PK_tblOrder] PRIMARY KEY CLUSTERED 
(
	[OrderID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblOrderItem]    Script Date: 4/9/2023 1:28:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblOrderItem](
	[OrderID] [int] NOT NULL,
	[ProductID] [int] NOT NULL,
	[Quantity] [int] NOT NULL,
 CONSTRAINT [PK_tblOrderItem] PRIMARY KEY CLUSTERED 
(
	[OrderID] ASC,
	[ProductID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblProduct]    Script Date: 4/9/2023 1:28:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblProduct](
	[ProductID] [int] IDENTITY(1,1) NOT NULL,
	[ProductName] [nvarchar](50) NOT NULL,
	[Price] [money] NOT NULL,
	[Picture] [nvarchar](250) NULL,
	[IsAvailable] [bit] NOT NULL,
 CONSTRAINT [PK_tblProduct] PRIMARY KEY CLUSTERED 
(
	[ProductID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblUser]    Script Date: 4/9/2023 1:28:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblUser](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](max) NULL,
	[LastName] [nvarchar](max) NULL,
	[UserName] [nvarchar](max) NULL,
	[Password] [nvarchar](max) NULL,
	[Token] [nvarchar](max) NULL,
	[Role] [nvarchar](max) NULL,
	[Email] [nvarchar](max) NULL,
 CONSTRAINT [PK_tblUser] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20230405150754_created tblUser', N'7.0.4')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20230405171458_created tblProduct, tblCustomer, tblOrder, tblOrderItem and status', N'7.0.4')
GO
SET IDENTITY_INSERT [dbo].[tblCustomer] ON 

INSERT [dbo].[tblCustomer] ([CustomerID], [CustomerName], [Address], [Email]) VALUES (2, N'Jannatul Ferdous', N'Mirpur', N'jannatul@gmail.com')
INSERT [dbo].[tblCustomer] ([CustomerID], [CustomerName], [Address], [Email]) VALUES (3, N'Afroza Tamanna', N'Banani Road-02', N'afroza@gmail.com')
INSERT [dbo].[tblCustomer] ([CustomerID], [CustomerName], [Address], [Email]) VALUES (4, N'Afifa Sharmin', N'Gazipur', N'afifa@gmail.com')
INSERT [dbo].[tblCustomer] ([CustomerID], [CustomerName], [Address], [Email]) VALUES (5, N'Faiza Islam', N'Faridpur', N'faiza@gmail.com')
SET IDENTITY_INSERT [dbo].[tblCustomer] OFF
GO
SET IDENTITY_INSERT [dbo].[tblOrder] ON 

INSERT [dbo].[tblOrder] ([OrderID], [OrderDate], [DeliveryDate], [Status], [CustomerID]) VALUES (23, CAST(N'2023-04-06' AS Date), CAST(N'2023-04-11' AS Date), 1, 5)
INSERT [dbo].[tblOrder] ([OrderID], [OrderDate], [DeliveryDate], [Status], [CustomerID]) VALUES (24, CAST(N'2023-04-06' AS Date), CAST(N'2023-04-13' AS Date), 1, 5)
INSERT [dbo].[tblOrder] ([OrderID], [OrderDate], [DeliveryDate], [Status], [CustomerID]) VALUES (25, CAST(N'2023-04-08' AS Date), CAST(N'2023-04-14' AS Date), 1, 4)
SET IDENTITY_INSERT [dbo].[tblOrder] OFF
GO
INSERT [dbo].[tblOrderItem] ([OrderID], [ProductID], [Quantity]) VALUES (23, 14, 2)
INSERT [dbo].[tblOrderItem] ([OrderID], [ProductID], [Quantity]) VALUES (23, 16, 1)
INSERT [dbo].[tblOrderItem] ([OrderID], [ProductID], [Quantity]) VALUES (24, 11, 1)
INSERT [dbo].[tblOrderItem] ([OrderID], [ProductID], [Quantity]) VALUES (24, 12, 3)
INSERT [dbo].[tblOrderItem] ([OrderID], [ProductID], [Quantity]) VALUES (24, 17, 10)
INSERT [dbo].[tblOrderItem] ([OrderID], [ProductID], [Quantity]) VALUES (25, 14, 1)
INSERT [dbo].[tblOrderItem] ([OrderID], [ProductID], [Quantity]) VALUES (25, 16, 1)
GO
SET IDENTITY_INSERT [dbo].[tblProduct] ON 

INSERT [dbo].[tblProduct] ([ProductID], [ProductName], [Price], [Picture], [IsAvailable]) VALUES (11, N'Clock', 250.0000, N'9a4ffae8-95a9-494a-ab0f-26d5767c5529.jpeg', 1)
INSERT [dbo].[tblProduct] ([ProductID], [ProductName], [Price], [Picture], [IsAvailable]) VALUES (12, N'Pen', 50.0000, N'750b8a54-836d-41eb-bb3f-cf6bb99b3b40.jpeg', 1)
INSERT [dbo].[tblProduct] ([ProductID], [ProductName], [Price], [Picture], [IsAvailable]) VALUES (14, N'Mouse', 450.0000, N'f12211f9-cab9-4cda-b26f-4d50de04fb4c.jpg', 1)
INSERT [dbo].[tblProduct] ([ProductID], [ProductName], [Price], [Picture], [IsAvailable]) VALUES (16, N'Monitor', 12000.0000, N'81dcead3-d0ed-4a95-9277-9d1bf4b3fe00.jpg', 1)
INSERT [dbo].[tblProduct] ([ProductID], [ProductName], [Price], [Picture], [IsAvailable]) VALUES (17, N'Pencil', 12.0000, N'51d32593-05b4-467c-893a-d64b0f1b8b14.jpeg', 1)
SET IDENTITY_INSERT [dbo].[tblProduct] OFF
GO
SET IDENTITY_INSERT [dbo].[tblUser] ON 

INSERT [dbo].[tblUser] ([Id], [FirstName], [LastName], [UserName], [Password], [Token], [Role], [Email]) VALUES (2, N'Afia ', N'Islam', N'afia', N'IreJKNHmDzTkfgt4l5y4QGzIn6rHRvLHfOAsG+SbZkVEQKfR', NULL, N'Admin', N'afia@gmail.com')
INSERT [dbo].[tblUser] ([Id], [FirstName], [LastName], [UserName], [Password], [Token], [Role], [Email]) VALUES (3, N'Faria', N'Tasnim', N'faria', N'CjE24on+Josm/I5EmECBsmuYPJznZF/tFP1xjUWgLgtV55/j', NULL, N'Admin', N'faria@gmail.com')
SET IDENTITY_INSERT [dbo].[tblUser] OFF
GO
/****** Object:  Index [IX_tblOrder_CustomerID]    Script Date: 4/9/2023 1:28:11 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblOrder_CustomerID] ON [dbo].[tblOrder]
(
	[CustomerID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_tblOrderItem_ProductID]    Script Date: 4/9/2023 1:28:11 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblOrderItem_ProductID] ON [dbo].[tblOrderItem]
(
	[ProductID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[tblOrder]  WITH CHECK ADD  CONSTRAINT [FK_tblOrder_tblCustomer_CustomerID] FOREIGN KEY([CustomerID])
REFERENCES [dbo].[tblCustomer] ([CustomerID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tblOrder] CHECK CONSTRAINT [FK_tblOrder_tblCustomer_CustomerID]
GO
ALTER TABLE [dbo].[tblOrderItem]  WITH CHECK ADD  CONSTRAINT [FK_tblOrderItem_tblOrder_OrderID] FOREIGN KEY([OrderID])
REFERENCES [dbo].[tblOrder] ([OrderID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tblOrderItem] CHECK CONSTRAINT [FK_tblOrderItem_tblOrder_OrderID]
GO
ALTER TABLE [dbo].[tblOrderItem]  WITH CHECK ADD  CONSTRAINT [FK_tblOrderItem_tblProduct_ProductID] FOREIGN KEY([ProductID])
REFERENCES [dbo].[tblProduct] ([ProductID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tblOrderItem] CHECK CONSTRAINT [FK_tblOrderItem_tblProduct_ProductID]
GO
USE [master]
GO
ALTER DATABASE [InventoryManagementDB] SET  READ_WRITE 
GO
