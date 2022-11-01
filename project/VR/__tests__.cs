using System.Collections;
using System.Collections.Generic;
using NUnit.Framework;
using UnityEngine;
using UnityEngine.Profiling.Memory.Experimental;
using UnityEngine.TestTools;

namespace Tests
{   
    public class EditMode
    {
        // A Test behaves as an ordinary method
        [Test]
        public void InSceneTest()
        {
            Assert.Equals(new Vector3(0, 0, 0), GameObject.Find("VRCamera").transform.position);
        }
        [Test]
        public void BookListTest()
        {
            Assert.IsNotNull(GameObject.Find("ListOfBooks").transform.position);
        }
        [Test]
        public void InteractBook()
        {   
            var listOfBooks = new List<string>();
            listOfBooks.Add("a");
            listOfBooks.Add("b");
            listOfBooks.Add("c");
            listOfBooks.Add("d");
            Assert.Equals(listOfBooks.Count, GameObject.Find("ListOfBooks").GetComponent("count"));
        }
        [Test]
        public void ShowMetadata()
        {   
            var listOfBooks = new List<string>();
            listOfBooks.Add("a");
            listOfBooks.Add("b");
            listOfBooks.Add("c");
            listOfBooks.Add("d");
            foreach (var book in listOfBooks)
            {
                Assert.Equals(book, GameObject.Find("ListOfBooks").GetComponentInChildren<MetaData>(true));
            }
        }
        
        
    }
}
