-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 30, 2021 at 03:13 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `canon`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `total_cost` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `total_cost`, `created_at`) VALUES
(1, 0, '2021-07-30 12:56:25'),
(2, 0, '2021-07-30 12:57:45');

-- --------------------------------------------------------

--
-- Table structure for table `cart_item`
--

CREATE TABLE `cart_item` (
  `product_id` int(11) NOT NULL,
  `cart_id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `checkout`
--

CREATE TABLE `checkout` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `city` varchar(255) NOT NULL,
  `street` varchar(255) NOT NULL,
  `number` varchar(255) NOT NULL,
  `po_box` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `card_no` varchar(255) NOT NULL,
  `cvv` varchar(255) NOT NULL,
  `exp_date` varchar(255) NOT NULL,
  `total_cost` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `checkout`
--

INSERT INTO `checkout` (`id`, `user_id`, `city`, `street`, `number`, `po_box`, `phone`, `card_no`, `cvv`, `exp_date`, `total_cost`, `created_at`) VALUES
(1, 1, 'Athens', 'Korai', '4', '10564', '6948569282', '454545454545454545', '789', '2023-08', 4269, '2021-07-30 13:12:28');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `order_history_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `order_history_id`, `product_id`) VALUES
(1, 1, 1),
(2, 1, 5);

-- --------------------------------------------------------

--
-- Table structure for table `order_history`
--

CREATE TABLE `order_history` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `checkout_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_history`
--

INSERT INTO `order_history` (`id`, `user_id`, `checkout_id`) VALUES
(1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(600) NOT NULL,
  `price` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `title`, `description`, `price`, `image`) VALUES
(1, 'Canon EOS R', 'With over 30 years of EOS innovation and design in its wake, the EOS R system’s pioneering lens mount sets the new standard for the cameras of the future. Offering the fastest autofocus in the world¹, this EOS R body brings new levels of operability to advanced EOS users, with faster communication between lens and camera, redefining photo and video capability. Incredible low light performance with -6EV autofocus², the camera also boasts 4K video, Vari-Angle touchscreen and intuitive controls for responsive handling - perfect for photographers and filmmakers alike.', 1170, '/home/renc/WebstormProjects/canon-api/resources/static/uploads/resized/1627649942539-pngfind.com-vlog-camera-png-6754689.png'),
(2, 'Canon RF 85mm F1.2L USM DS', 'The RF 85mm F1.2L USM DS delivers uncompromising sharpness along with the ultimate smooth bokeh for exceptional portraits to showcase your creative potential.', 3230, '/home/renc/WebstormProjects/canon-api/resources/static/uploads/resized/1627650004629-kisspng-canon-ef-lens-mount-canon-ef-85mm-lens-canon-ef-85-5b1cf06747d330.9209833215286232072942.png'),
(3, 'Canon EF 100-400mm F4.5-5.6L IS USM', 'The EF 100-400mm F4.5-5.6L IS USM offers sharpness and versality with superb super telephoto power and 5-stop image stabilisation in a compact, body.', 2979, '/home/renc/WebstormProjects/canon-api/resources/static/uploads/resized/1627650055476-kisspng-canon-ef-lens-mount-canon-ef-100400mm-lens-zoom-5b166bb5311903.0179696915281960212011.png'),
(4, 'CANON RF 70-200MM F2.8L IS USM', 'Capture the world with outstanding flexibility and quality with a super compact F2.8 telephoto zoom that incorporates a five-stop Image Stabilizer to ensure great hand held results, closer focusing down to 0.7m and fastest-ever AF.', 2729, '/home/renc/WebstormProjects/canon-api/resources/static/uploads/resized/1627650232032-canon-rf-70-200mm.jpeg'),
(5, 'EF 11-24mm f/4L USM', 'The complete range of ultra wide-angle focal lengths in a single high-quality zoom lens. Perfect for those shooting landscapes, architecture and interiors on location.', 3099, '/home/renc/WebstormProjects/canon-api/resources/static/uploads/resized/1627650400258-20150422163100_canon_ef_11_24mm_f_4_l_usm.jpeg'),
(6, 'EF 200-400mm f/4L IS USM Extender 1.4x', 'A professional-grade 200-400mm f/4 lens with a built-in 1.4x extender that boosts focal lengths to 280-560mm. A four-stop Image Stabilizer maximises sharpness. Instinctive controls enhance handing.', 11209, '/home/renc/WebstormProjects/canon-api/resources/static/uploads/resized/1627650573173-canon_5176b002_ef_200_400mm_f_4l_is_973129.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`) VALUES
(1, 'john', 'snow', 'test@gmail.com', '$2b$10$JEoXiipBR0aIPTVkFkj.yeW7IjLNCU7oP2j30JfpUod934KxWhsz6'),
(2, 'Fred', 'Lamar', 'test1@gmail.com', '$2b$10$g.JugqlfJuOAE2LWAeYiaeTWLtXuHXB3zXVWJmuv6sFOKyzYM3hNG');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart_item`
--
ALTER TABLE `cart_item`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `cart_id` (`cart_id`);

--
-- Indexes for table `checkout`
--
ALTER TABLE `checkout`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_history_id` (`order_history_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `order_history`
--
ALTER TABLE `order_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `checkout_id` (`checkout_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `checkout`
--
ALTER TABLE `checkout`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `order_history`
--
ALTER TABLE `order_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `cart_item`
--
ALTER TABLE `cart_item`
  ADD CONSTRAINT `cart_item_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_item_ibfk_2` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `checkout`
--
ALTER TABLE `checkout`
  ADD CONSTRAINT `checkout_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`order_history_id`) REFERENCES `order_history` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_history`
--
ALTER TABLE `order_history`
  ADD CONSTRAINT `order_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_history_ibfk_2` FOREIGN KEY (`checkout_id`) REFERENCES `checkout` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
