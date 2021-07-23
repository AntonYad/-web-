# -TinyWebServer-
🔥基于http协议的web服务器项目
http协议被广泛使用，从移动端，pc端浏览器，http协议无疑是打开互联网应用窗口的重要协议，http在网络应用 层中的地位不可撼动，是能准确区分前后台的重要协议。
我们的服务器程序，我们就可以把它理解为是一个通过http协议进行限制的tcp通信socket套接字编程时所做的服务器客户端的那么一个程序，我们给这个服务器程序加上了一个http协议，让它发送的数据都是http封装的报文，由于有http协议，因此，这个服务器就有了可以解析浏览器发来的请求，并依据请求返回对应的响应。

而为了让我们这个服务器程序能够更好用，上面的这些当然还是不够的，因此通常我们可以引入一个cgi模块，cgi模块其实就是一个cgi程序与web服务器之间的接口标准，可以在对应的cgi程序与web服务器端进行通信的桥梁。

有了这个模块，比如我们就可以在服务器上做一个简单的计算器程序，那么当用户在页面上进行计算请求时，服务端就会启动这个计算器程序，并将结果返回给用户。这就实现了用户与服务器之间的交互。
一般服务器都是会同时被多个用户进行访问的，大量链接的进入会让服务器内部的进程或线程暴增，那么这对于服务器来说是相危险的，因此，我们其实可以通过线程池来有效的解决这个问题。这是非常重要的一点。


# web服务器

# web服务器的模式设计
C/S结构（Client/Server，客户/服务器模式）服务器通常采用高性能的PC、工作站或小型机，并采用大型数据库系统，如ORACLE、SYBASE、InfORMix或 SQL Server。客户端需要安装专用的客户端软件。通过将任务合理分配到Client端和Server端，降低了系统的通讯开销，可以充分利用两端硬件环境的优势。客户端进行用户界面/事物处理，服务器进行数据处理。如图所示
![avatar](https://img-blog.csdnimg.cn/2020071116151968.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2ZhbXVy,size_16,color_FFFFFF,t_70)

# 技术特点
网络编程（TCP/IP协议, socket流式套接字，http协议）
多线程技术
cgi技术
shell脚本
mysql C api技术
使用多路转接进行升级

# 基于http的开发
# 对http背景知识补充
# http协议有这么几个基本的特点：
1.简单快速，因为http的服务器端程序一般相对规模较小，通信速度较快

2.灵活，http协议的同行兼容任意类型的资源，正在传输的资源类型统一用Content-Type来标记

3.无连接 每次连接只处理一个请求，服务器对请求做出响应之后，就会断开连接，因此节省时间

4.无状态 无状态就是指每次只有在新请求来了才会产生新响应，协议本身不会保留之前的请求和响应，这样可以更快的处理大量的事务。

## http的请求与响应
![avatar](https://img-blog.csdnimg.cn/20200711162123587.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2ZhbXVy,size_16,color_FFFFFF,t_70)

详细的request

![avatar](https://img-blog.csdnimg.cn/20200711162235578.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2ZhbXVy,size_16,color_FFFFFF,t_70)
详细的response

![avatar](https://img-blog.csdnimg.cn/20200711162246322.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2ZhbXVy,size_16,color_FFFFFF,t_70)

# http的状态码及含义
### 响应状态码有三位数字组成，第一个数字定义了响应的类别，且有五种可能取值：
1xx：指示信息–表示请求已接收，继续处理
2xx：成功–表示请求已被成功接收、理解、接受
3xx：重定向–要完成请求必须进行更进一步的操作
4xx：客户端错误–请求有语法错误或请求无法实现
5xx：服务器端错误–服务器未能实现合法的请求
常见状态代码、状态描述、说明：
200 OK //客户端请求成功
400 Bad Request //客户端请求有语法错误，不能被服务器所理解
401 Unauthorized //请求未经授权，这个状态代码必须和WWW-Authenticate报头域一起使用
403 Forbidden //服务器收到请求，但是拒绝提供服务
404 Not Found //请求资源不存在，eg：输入了错误的URL
500 Internal Server Error //服务器发生不可预期的错误
503 Server Unavailable //服务器当前不能处理客户端的请求，一段时间后可能恢复正常

## cgi技术介绍
CGI(Common Gateway Interface) 是WWW技术中最重要的技术之一，有着不可替代的重要地位。CGI是外部应用程序（CGI程序）与WEB服务器之间的接口标准，是在CGI程序和Web服务器之间传递信息的过程。其实，要真正理解CGI并不简单，首先我们从现象入手
浏览器除了从服务器下获得资源（网页，图片，文字等），有时候还有能上传一些东西（提交表单，注册用户之类的），看看我们目前的http只能进行获得资源，并不能够进行上传资源，所以目前http并不具有交互式。为了让我
们的网站能够实现交互式，我们需要使用CGI完成，时刻记着，我们目前是要写一个http，所以，CGI的所有交互细节，都需要我们来完成。
