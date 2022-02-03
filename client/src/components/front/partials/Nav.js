import React from 'react';

export default function Nav() {
  return (
        <nav>
            <div className="site-title">
                <a href="/"><h1>Blog Ninja</h1></a>
                <p>A Net Ninja Site</p>
            </div>
            <ul>
                <li><a href="/">Blogs</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/blogs/create">New Blog</a></li>
            </ul>
        </nav>
    );
}
